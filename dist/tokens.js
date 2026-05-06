import * as jwt from "jsonwebtoken";
export function generateTokens(payload, secret, expiresIn) {
    const accessToken = jwt.sign(payload, secret, { expiresIn });
    return { accessToken };
}
export function generateToken(payload, secret, expiresIn) {
    return generateTokens(payload, secret, expiresIn).accessToken;
}
export function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}
