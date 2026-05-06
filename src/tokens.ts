import * as jwt from "jsonwebtoken";

export function generateTokens(
  payload: any,
  secret: string,
  expiresIn: string
) {
  const accessToken = jwt.sign(
    payload,
    secret,
    { expiresIn } as jwt.SignOptions
  );

  return { accessToken };
}

export function generateToken(
  payload: any,
  secret: string,
  expiresIn: string
) {
  return generateTokens(payload, secret, expiresIn).accessToken;
}

export function verifyToken(token: string, secret: string) {
  return jwt.verify(token, secret) as any;
}
