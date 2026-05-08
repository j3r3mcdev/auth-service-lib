import { createAuthGuard } from "../src/auth/guard/create-auth-guard";
import { requireRole } from "../src/roles/role-checker";

describe("Auth Guard", () => {
  const mockReq = () => ({
    headers: {},
    user: null as any,
  });

  const mockRes = () => {
    const res: any = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  const mockNext = () => jest.fn();

  test("should return 401 if no token is provided", async () => {
    const guard = createAuthGuard({
      extract: {
        extractToken: () => null,
      },
    });

    const req = mockReq();
    const res = mockRes();
    const next = mockNext();

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unauthorized: No token provided",
    });
    expect(next).not.toHaveBeenCalled();
  });

  test("should return 401 if token is invalid", async () => {
    const guard = createAuthGuard({
      extract: {
        extractToken: () => "abc",
      },
      validate: {
        validateToken: async () => {
          throw new Error("Invalid");
        },
      },
    });

    const req = mockReq();
    const res = mockRes();
    const next = mockNext();

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test("should attach user and call next() when valid", async () => {
    const guard = createAuthGuard({
      extract: {
        extractToken: () => "valid",
      },
      validate: {
        validateToken: async () => ({ id: 1 }),
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          payload: { id: 1 },
          roles: [],
          permissions: [],
        }),
      },
    });

    const req = mockReq();
    const res = mockRes();
    const next = mockNext();

    await guard(req, res, next);

    expect(req.user!).toBeDefined();
    expect(req.user!.isAuthenticated).toBe(true);
    expect(next).toHaveBeenCalled();
  });

  test("should return 403 if required roles are missing", async () => {
    const guard = createAuthGuard({
      extract: {
        extractToken: () => "valid",
      },
      validate: {
        validateToken: async () => ({ id: 1 }),
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          payload: { id: 1 },
          roles: ["USER"],
          permissions: [],
        }),
      },
      access: {
        roleChecks: [requireRole("ADMIN")],
      },
    });

    const req = mockReq();
    const res = mockRes();
    const next = mockNext();

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });

  test("guard rejects when role-check fails", async () => {
    const guard = createAuthGuard({
      extract: {
        extractToken: () => "token",
      },
      validate: {
        validateToken: async () => ({ id: 1 }),
      },
      user: {
        buildUserObject: () => ({
          isAuthenticated: true,
          payload: { id: 1 },
          roles: ["user"],
          permissions: [],
        }),
      },
      access: {
        roleChecks: [requireRole("admin")],
      },
    });

    const req = mockReq();
    const res = mockRes();
    const next = mockNext();

    await guard(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(next).not.toHaveBeenCalled();
  });
});
