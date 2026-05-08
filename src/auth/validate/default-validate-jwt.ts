import jwt from "jsonwebtoken";

export async function defaultValidateJwtToken(token: string): Promise<any> {
  if (!token) {
    throw new Error("No token provided");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  try {
    const payload = jwt.verify(token, secret);
    return payload;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
