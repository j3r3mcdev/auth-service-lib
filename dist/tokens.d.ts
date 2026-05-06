import jwt, { SignOptions } from 'jsonwebtoken';
export declare function generateTokens(payload: object, secret: string, expiresIn?: SignOptions['expiresIn']): {
    accessToken: string;
};
export declare function verifyToken(token: string, secret: string): string | jwt.JwtPayload | null;
//# sourceMappingURL=tokens.d.ts.map