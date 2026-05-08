import { defaultBuildUserObject } from "../src/auth/user/default-build-user";

describe("defaultBuildUserObject", () => {
  test("should build a minimal authenticated user", () => {
    const payload = { id: 1 };

    const user = defaultBuildUserObject(payload);

    expect(user).toEqual({
      isAuthenticated: true,
      payload: { id: 1 },
      roles: [],
      permissions: [],
    });
  });

  test("should keep payload as provided", () => {
    const payload = { id: 1, meta: { active: true } };

    const user = defaultBuildUserObject(payload);

    expect(user.payload).toEqual(payload);
  });

  test("should always set roles and permissions as empty arrays", () => {
    const user = defaultBuildUserObject({ id: 1 });

    expect(user.roles).toEqual([]);
    expect(user.permissions).toEqual([]);
  });

  test("should mark user as authenticated even if payload is null", () => {
    const user = defaultBuildUserObject(null);

    expect(user.isAuthenticated).toBe(true);
    expect(user.payload).toBeNull();
  });

  test("should not mutate the original payload", () => {
    const payload = { id: 1, meta: { active: true } };

    const user = defaultBuildUserObject(payload);

    expect(user.payload).toEqual(payload);
    expect(payload.meta.active).toBe(true);
  });

  test("should initialize roles as empty array", () => {
    const user = defaultBuildUserObject({ id: 1 });
    expect(user.roles).toEqual([]);
  });
});
