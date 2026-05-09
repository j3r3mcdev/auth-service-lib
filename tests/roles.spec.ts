import {
  requireRole,
  requireAnyRole,
  requireAllRoles,
} from "../src/roles/role-checker";

describe("Role Checkers", () => {
  const roles = ["admin", "editor", "user"];

  test("requireRole returns true when role is present", () => {
    const check = requireRole("admin");
    expect(check(roles)).toBe(true);
  });

  test("requireRole returns false when role is missing", () => {
    const check = requireRole("superadmin");
    expect(check(roles)).toBe(false);
  });

  test("requireAnyRole returns true when at least one role matches", () => {
    const check = requireAnyRole(["guest", "editor"]);
    expect(check(roles)).toBe(true);
  });

  test("requireAnyRole returns false when none match", () => {
    const check = requireAnyRole(["guest", "superadmin"]);
    expect(check(roles)).toBe(false);
  });

  test("requireAllRoles returns true when all roles match", () => {
    const check = requireAllRoles(["admin", "user"]);
    expect(check(roles)).toBe(true);
  });

  test("requireAllRoles returns false when at least one is missing", () => {
    const check = requireAllRoles(["admin", "superadmin"]);
    expect(check(roles)).toBe(false);
  });
});
