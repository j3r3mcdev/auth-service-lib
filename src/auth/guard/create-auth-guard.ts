import { defaultOptions } from "../core/default-options";
import { deepMerge } from "../core/deep-merge";
import { AuthGuardOptions } from "../core/types";

export function createAuthGuard(customOptions: AuthGuardOptions = {}) {
  const options = deepMerge(defaultOptions, customOptions);

  return async function authGuard(req: any, res: any, next: any) {
    try {
      // 1. Extraction du token
      const token = options.extract?.extractToken?.(req);
      if (!token) {
        return res
          .status(401)
          .json({ error: "Unauthorized: No token provided" });
      }

      // 2. Validation du token
      const payload = await options.validate?.validateToken?.(token);

      // 3. Construction de l'objet user
      const user = options.user?.buildUserObject?.(payload);

      if (!user || !user.isAuthenticated) {
        return res.status(401).json({ error: "Unauthorized: Invalid user" });
      }

      // 4. Vérification des rôles et permissions
      const roleChecks = options.access?.roleChecks || [];
      const permissionChecks = options.access?.permissionChecks || [];

      // Role checks
      if (roleChecks.length > 0) {
        const ok = roleChecks.every((check: (roles: string[]) => boolean) =>
          check(user.roles),
        );

        if (!ok) {
          return res.status(403).json({
            error: "Forbidden: Missing roles",
          });
        }
      }

      // Permission checks
      if (permissionChecks.length > 0) {
        const ok = permissionChecks.every(
          (check: (permissions: string[]) => boolean) =>
            check(user.permissions),
        );

        if (!ok) {
          return res.status(403).json({
            error: "Forbidden: Missing permissions",
          });
        }
      }

      // 5. Attacher l'utilisateur à la requête
      req.user = user;

      // 6. Continuer
      next();
    } catch (err) {
      return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
  };
}
