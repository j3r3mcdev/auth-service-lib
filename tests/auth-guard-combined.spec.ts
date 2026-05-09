import { createAuthGuard } from "../src/auth/guard/create-auth-guard";
import { requireRole, requireAnyRole } from "../src/roles/role-checker";
import {
  requirePermission,
  requireAnyPermission,
  requireAllPermissions,
} from "../src/auth/permission/permission-checker";

describe("Auth Guard - Combined Roles + Permissions", () => {
  const baseOptions = {
    extract: {
      extractToken: () => "token",
    },
    validate: {
      validateToken: async () => ({}),
    },
  };

  test("allows access when user has required role AND required permission", async () => {
    const guard = createAuthGuard({
      ...baseOptions,
      access: {
        roleChecks: [requireRole("ADMIN")],
        permissionChecks: [requirePermission("CAN_EDIT")],
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          roles: ["ADMIN"],
          permissions: ["CAN_EDIT"],
          payload: {},
        }),
      },
    });

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await guard(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  test("denies access when role is missing even if permission is present", async () => {
    const guard = createAuthGuard({
      ...baseOptions,
      access: {
        roleChecks: [requireRole("ADMIN")],
        permissionChecks: [requirePermission("CAN_EDIT")],
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          roles: ["USER"],
          permissions: ["CAN_EDIT"],
          payload: {},
        }),
      },
    });

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test("denies access when permission is missing even if role is present", async () => {
    const guard = createAuthGuard({
      ...baseOptions,
      access: {
        roleChecks: [requireRole("ADMIN")],
        permissionChecks: [requirePermission("CAN_EDIT")],
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          roles: ["ADMIN"],
          permissions: ["CAN_VIEW"],
          payload: {},
        }),
      },
    });

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test("allows access with multiple roleChecks and permissionChecks", async () => {
    const guard = createAuthGuard({
      ...baseOptions,
      access: {
        roleChecks: [
          requireRole("ADMIN"),
          requireAnyRole(["EDITOR", "MANAGER"]),
        ],
        permissionChecks: [
          requirePermission("CAN_EDIT"),
          requireAnyPermission(["CAN_DELETE", "CAN_PUBLISH"]),
        ],
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          roles: ["ADMIN", "EDITOR"],
          permissions: ["CAN_EDIT", "CAN_DELETE"],
          payload: {},
        }),
      },
    });

    const req: any = {};
    const res: any = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const next = jest.fn();

    await guard(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
