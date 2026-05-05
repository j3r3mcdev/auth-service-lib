import { PrismaClient } from '@prisma/client';
export declare class AuthRepository {
    private prisma;
    constructor(prisma: PrismaClient);
    createUser(data: {
        email: string;
        password: string;
    }): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByEmail(email: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    updateUser(id: string, data: any): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updateRefreshToken(id: string, refreshToken: string | null): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    clearRefreshToken(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    setResetToken(id: string, tokenHash: string, expiresAt: Date): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
    findByResetToken(tokenHash: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    clearResetToken(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    updatePassword(id: string, hashedPassword: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        email: string;
        password: string;
        refreshToken: string | null;
        resetToken: string | null;
        resetTokenExpiresAt: Date | null;
        createdAt: Date;
        updatedAt: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
//# sourceMappingURL=auth.repository.d.ts.map