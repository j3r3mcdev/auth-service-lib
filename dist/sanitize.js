export function sanitizeUser(user) {
    if (!user)
        return null;
    const { password, refreshToken, ...safe } = user;
    return safe;
}
