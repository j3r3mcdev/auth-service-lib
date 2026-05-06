export declare function generateTokens(payload: any, secret: string, expiresIn: string): {
    accessToken: string;
};
export declare function generateToken(payload: any, secret: string, expiresIn: string): string;
export declare function verifyToken(token: string, secret: string): any;
//# sourceMappingURL=tokens.d.ts.map