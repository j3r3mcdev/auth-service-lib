import jwt, { SignOptions } from 'jsonwebtoken';

export function generateTokens(
  payload: object,
  secret: string,
  expiresIn: SignOptions['expiresIn'] = '15m'
) {
  const accessToken = jwt.sign(payload, secret, { expiresIn } as SignOptions);
  return { accessToken };
}


export function verifyToken(token: string, secret: string) {
  try {
    return jwt.verify(token, secret);
  } catch {
    return null;
  }
}
