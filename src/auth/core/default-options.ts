import { AuthGuardOptions } from "./types";
import { defaultExtractTokenFromAuthorizationHeader } from "../extract/default-extract-token";
import { defaultValidateJwtToken } from "../validate/default-validate-jwt";
import { defaultBuildUserObject } from "../user/default-build-user";

export const defaultOptions: AuthGuardOptions = {
  extract: {
    extractToken: () => null,
  },
  validate: {
    validateToken: async () => null,
  },
  user: {
    buildUserObject: () => ({
      isAuthenticated: false,
      roles: [],
      permissions: [],
      payload: null,
    }),
  },
  access: {
    roleChecks: [],
    permissionChecks: [],
  },
};
