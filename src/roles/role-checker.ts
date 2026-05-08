import { Role } from "../auth/core/types";

export function requireRole(required: Role) {
  return (userRoles: Role[]) => userRoles.includes(required);
}

export function requireAnyRole(required: Role[]) {
  return (userRoles: Role[]) => required.some((r) => userRoles.includes(r));
}

export function requireAllRoles(required: Role[]) {
  return (userRoles: Role[]) => required.every((r) => userRoles.includes(r));
}
