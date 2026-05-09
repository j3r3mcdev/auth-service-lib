import { createAuthGuard } from "../src/auth/guard/create-auth-guard";
import { requireRole } from "../src/roles/role-checker";
import { requireAllPermissions } from "../src/auth/permission/permission-checker";

describe("Auth Guard - Combined requireAllPermissions", () => {
  const baseOptions = {
    extract: {
      extractToken: () => "token",
    },
    validate: {
      validateToken: async () => ({}),
    },
  };

  test("allows access when user has required role AND all required permissions", async () => {
    const guard = createAuthGuard({
      ...baseOptions,
      access: {
        roleChecks: [requireRole("ADMIN")],
        permissionChecks: [
          requireAllPermissions(["CAN_EDIT", "CAN_DELETE", "CAN_PUBLISH"]),
        ],
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          roles: ["ADMIN"],
          permissions: ["CAN_EDIT", "CAN_DELETE", "CAN_PUBLISH"],
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

  test("denies access when at least one required permission is missing", async () => {
    const guard = createAuthGuard({
      ...baseOptions,
      access: {
        roleChecks: [requireRole("ADMIN")],
        permissionChecks: [
          requireAllPermissions(["CAN_EDIT", "CAN_DELETE", "CAN_PUBLISH"]),
        ],
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          roles: ["ADMIN"],
          permissions: ["CAN_EDIT", "CAN_DELETE"], // ❌ missing CAN_PUBLISH
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
});
