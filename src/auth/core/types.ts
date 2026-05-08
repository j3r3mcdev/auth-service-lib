export interface ExtractOptions {
  extractToken?: (req: any) => string | null;
}

export interface ValidateOptions {
  validateToken?: (token: string) => Promise<any>;
}

export interface UserOptions {
  buildUserObject?: (payload: any) => {
    isAuthenticated: boolean;
    payload: any;
    roles: string[];
    permissions: string[];
  };
}

export interface AccessOptions {
  requiredRoles?: string[];
}

export interface AuthGuardOptions {
  extract?: ExtractOptions;
  validate?: ValidateOptions;
  user?: UserOptions;
  access?: AccessOptions;
}
