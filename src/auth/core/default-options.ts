import { AuthGuardOptions } from "./types";
import { defaultExtractTokenFromAuthorizationHeader } from "../extract/default-extract-token";
import { defaultValidateJwtToken } from "../validate/default-validate-jwt";
import { defaultBuildUserObject } from "../user/default-build-user";

export const defaultOptions: AuthGuardOptions = {
  extract: {
    extractToken: defaultExtractTokenFromAuthorizationHeader,
  },
  validate: {
    validateToken: defaultValidateJwtToken,
  },
  user: {
    buildUserObject: defaultBuildUserObject,
  },
  access: {
    requiredRoles: [],
  },
};
