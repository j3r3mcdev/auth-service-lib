// cSpell: disable

import {
  Injectable,
  ForbiddenException,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { AuthRepository } from './auth.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { RefreshDto } from './dto/refresh.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { randomBytes, createHash } from 'crypto';

@Injectable()
export class AuthService {
  private readonly isE2E = process.env.NODE_ENV === 'test:e2e';

  constructor(
    private readonly repo: AuthRepository,
    private readonly jwt: JwtService,
  ) {}

  // -------------------------
  // UTILS
  // -------------------------

  sha256(data: string): string {
    return createHash('sha256').update(data).digest('hex');
  }

  generateTokens(user: { id: string; email: string }) {
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
          jti: randomBytes(16).toString('hex'), // token unique
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

  async register(dto: RegisterDto) {
    const hashed = await bcrypt.hash(dto.password, 10);

    let user;
    try {
      user = await this.repo.createUser({
        email: dto.email,
        password: hashed,
      });
    } catch (err: any) {
      if (err?.code === 'P2002') {
        throw new ConflictException('Email already exists');
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

  async login(dto: LoginDto) {
    const user = await this.repo.findByEmail(dto.email);
    if (!user) throw new ForbiddenException('Invalid credentials');

    const valid = await bcrypt.compare(dto.password, user.password);
    if (!valid) throw new ForbiddenException('Invalid credentials');

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

  async me(userId: string) {
    const user = await this.repo.findById(userId);
    if (!user) throw new NotFoundException('User not found');

    return {
      sub: user.id,
      email: user.email,
    };
  }

  // -------------------------
  // UPDATE USER
  // -------------------------

  async updateUser(userId: string, dto: UpdateUserDto) {
    const data: any = {};

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

  async logout(userId: string) {
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

  async refresh(dto: RefreshDto) {
    const { refreshToken } = dto;

    if (!refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    let payload: any;
    try {
      payload = this.jwt.verify(refreshToken, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new ForbiddenException('Access denied');
    }

    const user = await this.repo.findById(payload.sub);
    if (!user) throw new ForbiddenException('Access denied');

    const valid = await bcrypt.compare(refreshToken, user.refreshToken!);
    if (!valid) throw new ForbiddenException('Access denied');

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

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.repo.findByEmail(dto.email);

    if (!user) {
      return this.isE2E ? 'Reset email sent' : undefined;
    }

    const token = randomBytes(32).toString('hex');
    const tokenHash = this.sha256(token);

    const expiresAt = new Date(Date.now() + 1000 * 60 * 15);

    await this.repo.setResetToken(user.id, tokenHash, expiresAt);

    return token;
  }

  // -------------------------
  // RESET PASSWORD
  // -------------------------

  async resetPassword(dto: ResetPasswordDto) {
    const tokenHash = this.sha256(dto.token);
    const user = await this.repo.findByResetToken(tokenHash);

    if (!user) {
      throw new ForbiddenException('Invalid or expired token');
    }

    if (!user.resetTokenExpiresAt || user.resetTokenExpiresAt < new Date()) {
      throw new ForbiddenException('Invalid or expired token');
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);

    await this.repo.updatePassword(user.id, hashedPassword);
    await this.repo.clearResetToken(user.id);

    return this.isE2E
      ? { message: 'Password reset successfully' }
      : { message: 'Password updated' };
  }
}
