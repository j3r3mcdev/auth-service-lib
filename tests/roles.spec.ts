import {
  hasRole,
  hasAnyRole,
  hasAllRoles,
  addRole,
  addRoles,
} from "../src/roles/role-utils";

describe("Role utils", () => {
  test("hasRole should detect a role", () => {
    expect(hasRole(["admin"], "admin")).toBe(true);
    expect(hasRole(["admin"], "user")).toBe(false);
  });

  test("hasAnyRole should detect at least one role", () => {
    expect(hasAnyRole(["admin"], ["user", "admin"])).toBe(true);
    expect(hasAnyRole(["guest"], ["user", "admin"])).toBe(false);
  });

  test("hasAllRoles should require all roles", () => {
    expect(hasAllRoles(["admin", "user"], ["admin"])).toBe(true);
    expect(hasAllRoles(["admin"], ["admin", "user"])).toBe(false);
  });

  test("addRole should add a role only once", () => {
    expect(addRole(["admin"], "admin")).toEqual(["admin"]);
    expect(addRole(["admin"], "user")).toEqual(["admin", "user"]);
  });

  test("addRoles should merge roles without duplicates", () => {
    expect(addRoles(["admin"], ["admin", "user"])).toEqual(["admin", "user"]);
  });
});
