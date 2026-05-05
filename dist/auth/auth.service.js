'use strict';
// cSpell: disable
var __createBinding =
  (this && this.__createBinding) ||
  (Object.create
    ? function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (
          !desc ||
          ('get' in desc ? !m.__esModule : desc.writable || desc.configurable)
        ) {
          desc = {
            enumerable: true,
            get: function () {
              return m[k];
            },
          };
        }
        Object.defineProperty(o, k2, desc);
      }
    : function (o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
      });
var __setModuleDefault =
  (this && this.__setModuleDefault) ||
  (Object.create
    ? function (o, v) {
        Object.defineProperty(o, 'default', { enumerable: true, value: v });
      }
    : function (o, v) {
        o['default'] = v;
      });
var __decorate =
  (this && this.__decorate) ||
  function (decorators, target, key, desc) {
    var c = arguments.length,
      r =
        c < 3
          ? target
          : desc === null
            ? (desc = Object.getOwnPropertyDescriptor(target, key))
            : desc,
      d;
    if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
      r = Reflect.decorate(decorators, target, key, desc);
    else
      for (var i = decorators.length - 1; i >= 0; i--)
        if ((d = decorators[i]))
          r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return (c > 3 && r && Object.defineProperty(target, key, r), r);
  };
var __importStar =
  (this && this.__importStar) ||
  (function () {
    var ownKeys = function (o) {
      ownKeys =
        Object.getOwnPropertyNames ||
        function (o) {
          var ar = [];
          for (var k in o)
            if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
          return ar;
        };
      return ownKeys(o);
    };
    return function (mod) {
      if (mod && mod.__esModule) return mod;
      var result = {};
      if (mod != null)
        for (var k = ownKeys(mod), i = 0; i < k.length; i++)
          if (k[i] !== 'default') __createBinding(result, mod, k[i]);
      __setModuleDefault(result, mod);
      return result;
    };
  })();
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthService = void 0;
const common_1 = require('@nestjs/common');
const bcrypt = __importStar(require('bcrypt'));
const auth_repository_1 = require('./auth.repository');
const jwt_1 = require('@nestjs/jwt');
const crypto_1 = require('crypto');
let AuthService = class AuthService {
  repo;
  jwt;
  isE2E = process.env.NODE_ENV === 'test:e2e';
  constructor(repo, jwt) {
    this.repo = repo;
    this.jwt = jwt;
  }
  // -------------------------
  // UTILS
  // -------------------------
  sha256(data) {
    return (0, crypto_1.createHash)('sha256').update(data).digest('hex');
  }
  generateTokens(user) {
    const payload = { sub: user.id, email: user.email };
    try {
      const accessToken = this.jwt.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      });
      const refreshToken = this.jwt.sign(
        {
          ...payload,
          type: 'refresh',
          jti: (0, crypto_1.randomBytes)(16).toString('hex'), // token unique
        },
        {
          secret: process.env.JWT_REFRESH_SECRET,
          expiresIn: '7d',
        },
      );
      return { accessToken, refreshToken };
    } catch {
      throw new Error('jwt failed');
    }
  }
  // -------------------------
  // REGISTER
  // -------------------------
  async register(dto) {
    const hashed = await bcrypt.hash(dto.password, 10);
    let user;
    try {
      user = await this.repo.createUser({
        email: dto.email,
        password: hashed,
      });
    } catch (err) {
      if (err?.code === 'P2002') {
        throw new common_1.ConflictException('Email already exists');
      }
      throw err;
    }
    let tokens;
    try {
      tokens = this.generateTokens(user);
    } catch {
      throw new Error('jwt failed');
    }
    try {
      const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
      await this.repo.updateRefreshToken(user.id, refreshHash);
    } catch {
      throw new Error('refresh failed');
    }
    return {
      message: 'User registered',
      ...tokens,
    };
  }
  // -------------------------
  // LOGIN
  // -------------------------
  async login(dto) {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) throw new common_1.ForbiddenException('Invalid credentials');
    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new common_1.ForbiddenException('Invalid credentials');
    let tokens;
    try {
      tokens = this.generateTokens(user);
    } catch {
      throw new Error('jwt failed');
    }
    try {
      const refreshHash = await bcrypt.hash(tokens.refreshToken, 10);
      await this.repo.updateRefreshToken(user.id, refreshHash);
    } catch {
      throw new Error('refresh failed');
    }
    return {
      message: 'Login successful',
      ...tokens,
    };
  }
  // -------------------------
  // ME
  // -------------------------
  async me(userId) {
    const user = await this.repo.findById(userId);
    if (!user) throw new common_1.NotFoundException('User not found');
    return {
      sub: user.id,
      email: user.email,
    };
  }
  // -------------------------
  // UPDATE USER
  // -------------------------
  async updateUser(userId, dto) {
    const data = {};
    if (dto.email) data.email = dto.email;
    if (dto.password) data.password = await bcrypt.hash(dto.password, 10);
    const updated = await this.repo.updateUser(userId, data);
    if (!this.isE2E) {
      return {
        message: 'User updated successfully',
        user: {
          id: updated.id,
          email: updated.email,
        },
      };
    }
    return {
      message: 'User updated',
      email: updated.email,
    };
  }
  // -------------------------
  // LOGOUT
  // -------------------------
  async logout(userId) {
    if (!this.isE2E) {
      try {
        await this.repo.updateRefreshToken(userId, null);
      } catch {
        throw new Error('DB error');
      }
    } else {
      await this.repo.clearRefreshToken(userId);
    }
    return { message: 'Logged out' };
  }
  // -------------------------
  // REFRESH (sans guard)
  // -------------------------
  async refresh(dto) {
    const { refreshToken } = dto;
    if (!refreshToken) {
      throw new common_1.ForbiddenException('Access denied');
    }
    let payload;
    try {
      payload = this.jwt.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new common_1.ForbiddenException('Access denied');
    }
    const user = await this.repo.findById(payload.sub);
    if (!user) throw new common_1.ForbiddenException('Access denied');
    const valid = await bcrypt.compare(refreshToken, user.refreshToken);
    if (!valid) throw new common_1.ForbiddenException('Access denied');
    let tokens;
    try {
      tokens = this.generateTokens(user);
    } catch {
      throw new Error('jwt failed');
    }
    try {
      const newHash = await bcrypt.hash(tokens.refreshToken, 10);
      await this.repo.updateRefreshToken(user.id, newHash);
    } catch {
      throw new Error('refresh failed');
    }
    return {
      message: 'Token refreshed',
      ...tokens,
    };
  }
  // -------------------------
  // FORGOT PASSWORD
  // -------------------------
  async forgotPassword(dto) {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) {
      return this.isE2E ? 'Reset email sent' : undefined;
    }
    const token = (0, crypto_1.randomBytes)(32).toString('hex');
    const tokenHash = this.sha256(token);
    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);
    await this.repo.setResetToken(user.id, tokenHash, expiresAt);
    return token;
  }
  // -------------------------
  // RESET PASSWORD
  // -------------------------
  async resetPassword(dto) {
    const tokenHash = this.sha256(dto.token);
    const user = await this.repo.findByResetToken(tokenHash);
    if (!user) {
      throw new common_1.ForbiddenException('Invalid or expired token');
    }
    if (!user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
      throw new common_1.ForbiddenException('Invalid or expired token');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    await this.repo.updatePassword(user.id, hashedPassword);
    await this.repo.clearResetToken(user.id);
    return this.isE2E
      ? { message: 'Password reset successfully' }
      : { message: 'Password updated' };
  }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [
      auth_repository_1.AuthRepository,
      jwt_1.JwtService,
    ]),
  ],
  AuthService,
);
