export function sanitizeUser(user: any) {
  if (!user) return null;

  const { password, refreshToken, ...safe } = user;
  return safe;
}
