import jwt from 'jsonwebtoken';
export function generateTokens(payload, secret, expiresIn = '15m') {
    const accessToken = jwt.sign(payload, secret, { expiresIn });
    return { accessToken };
}
export function verifyToken(token, secret) {
    try {
        return jwt.verify(token, secret);
    }
    catch {
        return null;
    }
}
