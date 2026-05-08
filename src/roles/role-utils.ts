import { Role } from "../auth/core/types";

export function hasRole(userRoles: Role[], role: Role): boolean {
  return userRoles.includes(role);
}

export function hasAnyRole(userRoles: Role[], roles: Role[]): boolean {
  return roles.some((r) => userRoles.includes(r));
}

export function hasAllRoles(userRoles: Role[], roles: Role[]): boolean {
  return roles.every((r) => userRoles.includes(r));
}

export function addRole(userRoles: Role[], role: Role): Role[] {
  return userRoles.includes(role) ? userRoles : [...userRoles, role];
}

export function addRoles(userRoles: Role[], roles: Role[]): Role[] {
  const set = new Set([...userRoles, ...roles]);
  return Array.from(set);
}
