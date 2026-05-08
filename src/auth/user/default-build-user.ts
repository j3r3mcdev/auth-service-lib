import { defaultUserRoles } from "../../roles/default-roles";

export function defaultBuildUserObject(payload: any) {
  return {
    isAuthenticated: true,
    payload,
    roles: defaultUserRoles(),
    permissions: [],
  };
}
