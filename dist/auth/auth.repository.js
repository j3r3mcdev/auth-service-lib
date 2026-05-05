'use strict';
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
var __metadata =
  (this && this.__metadata) ||
  function (k, v) {
    if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
      return Reflect.metadata(k, v);
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.AuthRepository = void 0;
const common_1 = require('@nestjs/common');
const client_1 = require('@prisma/client');
let AuthRepository = class AuthRepository {
  prisma;
  constructor(prisma) {
    this.prisma = prisma;
  }
  // -------------------------
  // USERS
  // -------------------------
  createUser(data) {
    return this.prisma.user.create({ data });
  }
  findByEmail(email) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
  findById(id) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }
  updateUser(id, data) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
  // -------------------------
  // REFRESH TOKEN
  // -------------------------
  updateRefreshToken(id, refreshToken) {
    return this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }
  clearRefreshToken(id) {
    return this.prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }
  // -------------------------
  // RESET PASSWORD
  // -------------------------
  setResetToken(id, tokenHash, expiresAt) {
    return this.prisma.user.update({
      where: { id },
      data: {
        resetToken: tokenHash,
        resetTokenExpiresAt: expiresAt,
      },
    });
  }
  /**
   * IMPORTANT :
   * On NE filtre PLUS l'expiration ici.
   * Le service reset-password gère déjà :
   *   - token invalide
   *   - token expiré
   *   - token absent
   *
   * Donc ici on doit juste retrouver l'utilisateur par resetToken.
   */
  findByResetToken(tokenHash) {
    return this.prisma.user.findFirst({
      where: {
        resetToken: tokenHash, // ✔ plus de resetTokenExpiresAt: { gt: new Date() }
      },
    });
  }
  clearResetToken(id) {
    return this.prisma.user.update({
      where: { id },
      data: {
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });
  }
  updatePassword(id, hashedPassword) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  }
};
exports.AuthRepository = AuthRepository;
exports.AuthRepository = AuthRepository = __decorate(
  [
    (0, common_1.Injectable)(),
    __metadata('design:paramtypes', [client_1.PrismaClient]),
  ],
  AuthRepository,
);
