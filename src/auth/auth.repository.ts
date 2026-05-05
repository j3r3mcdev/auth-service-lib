import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class AuthRepository {
  constructor(private prisma: PrismaClient) {}

  // -------------------------
  // USERS
  // -------------------------

  createUser(data: { email: string; password: string }) {
    return this.prisma.user.create({ data });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  updateUser(id: string, data: any) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }

  // -------------------------
  // REFRESH TOKEN
  // -------------------------

  updateRefreshToken(id: string, refreshToken: string | null) {
    return this.prisma.user.update({
      where: { id },
      data: { refreshToken },
    });
  }

  clearRefreshToken(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: { refreshToken: null },
    });
  }

  // -------------------------
  // RESET PASSWORD
  // -------------------------

  setResetToken(id: string, tokenHash: string, expiresAt: Date) {
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
  findByResetToken(tokenHash: string) {
    return this.prisma.user.findFirst({
      where: {
        resetToken: tokenHash, // ✔ plus de resetTokenExpiresAt: { gt: new Date() }
      },
    });
  }

  clearResetToken(id: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        resetToken: null,
        resetTokenExpiresAt: null,
      },
    });
  }

  updatePassword(id: string, hashedPassword: string) {
    return this.prisma.user.update({
      where: { id },
      data: {
        password: hashedPassword,
      },
    });
  }
}
