// 1. Définition du type Role
export type Role = string;

// 2. Options d'extraction
export interface ExtractOptions {
  extractToken?: (req: any) => string | null;
}

// 3. Options de validation
export interface ValidateOptions {
  validateToken?: (token: string) => Promise<any>;
}

// 4. Options de construction du user
export interface UserOptions {
  buildUserObject?: (payload: any) => {
    isAuthenticated: boolean;
    payload: any;
    roles: Role[];
    permissions: string[];
  };
}

// 5. Options d'accès (rôles)
export interface AccessOptions {
  requiredRoles?: Role[]; // ancien système (optionnel)
  roleChecks?: Array<(roles: Role[]) => boolean>; // nouveau système
}

// 6. Options complètes du guard
export interface AuthGuardOptions {
  extract?: ExtractOptions;
  validate?: ValidateOptions;
  user?: UserOptions;
  access?: AccessOptions;
}
