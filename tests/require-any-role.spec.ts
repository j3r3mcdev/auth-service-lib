import { requireAnyRole } from "../src/roles/role-checker";

describe("requireAnyRole", () => {
  const roles = ["ADMIN", "EDITOR", "USER"];

  test("returns true when at least one required role is present", () => {
    const check = requireAnyRole(["GUEST", "EDITOR"]);
    expect(check(roles)).toBe(true);
  });

  test("returns false when none of the required roles are present", () => {
    const check = requireAnyRole(["GUEST", "MANAGER"]);
    expect(check(roles)).toBe(false);
  });

  test("returns true when multiple roles match", () => {
    const check = requireAnyRole(["ADMIN", "EDITOR"]);
    expect(check(roles)).toBe(true);
  });

  test("returns false when required list is empty", () => {
    const check = requireAnyRole([]);
    expect(check(roles)).toBe(false);
  });

  test("returns false when user has no roles", () => {
    const check = requireAnyRole(["ADMIN"]);
    expect(check([])).toBe(false);
  });
});
