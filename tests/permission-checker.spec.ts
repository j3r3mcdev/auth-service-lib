import {
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
} from "../src/auth/permission/permission-checker";

describe("Permission Checkers", () => {
  const userPermissions = ["CAN_EDIT", "CAN_DELETE", "CAN_VIEW"];

  // -----------------------------
  // requirePermission
  // -----------------------------
  test("requirePermission returns true when permission is present", () => {
    const check = requirePermission("CAN_EDIT");
    expect(check(userPermissions)).toBe(true);
  });

  test("requirePermission returns false when permission is missing", () => {
    const check = requirePermission("CAN_PUBLISH");
    expect(check(userPermissions)).toBe(false);
  });

  // -----------------------------
  // requireAnyPermission
  // -----------------------------
  test("requireAnyPermission returns true when at least one permission matches", () => {
    const check = requireAnyPermission(["CAN_PUBLISH", "CAN_DELETE"]);
    expect(check(userPermissions)).toBe(true);
  });

  test("requireAnyPermission returns false when none match", () => {
    const check = requireAnyPermission(["CAN_PUBLISH", "CAN_ARCHIVE"]);
    expect(check(userPermissions)).toBe(false);
  });

  // -----------------------------
  // requireAllPermissions
  // -----------------------------
  test("requireAllPermissions returns true when all permissions match", () => {
    const check = requireAllPermissions(["CAN_EDIT", "CAN_DELETE"]);
    expect(check(userPermissions)).toBe(true);
  });

  test("requireAllPermissions returns false when at least one is missing", () => {
    const check = requireAllPermissions(["CAN_EDIT", "CAN_PUBLISH"]);
    expect(check(userPermissions)).toBe(false);
  });
});
