// 1. Vérifie qu'une permission précise est présente
export function requirePermission(permission: string) {
  return (permissions: string[]) => {
    return permissions.includes(permission);
  };
}

// 2. Vérifie qu'au moins une permission est présente
export function requireAnyPermission(required: string[]) {
  return (permissions: string[]) => {
    return required.some((p) => permissions.includes(p));
  };
}

// 3. Vérifie que toutes les permissions sont présentes
export function requireAllPermissions(required: string[]) {
  return (permissions: string[]) => {
    return required.every((p) => permissions.includes(p));
  };
}
