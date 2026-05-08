export function defaultExtractTokenFromAuthorizationHeader(
  req: any,
): string | null {
  if (!req || !req.headers) {
    return null;
  }

  const auth = req.headers["authorization"] || req.headers["Authorization"];
  if (!auth || typeof auth !== "string") {
    return null;
  }

  // Format attendu : "Bearer <token>"
  const parts = auth.split(" ");
  if (parts.length !== 2) {
    return null;
  }

  const [scheme, token] = parts;

  if (scheme !== "Bearer") {
    return null;
  }

  return token || null;
}
