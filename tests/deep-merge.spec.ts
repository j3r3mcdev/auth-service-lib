import { deepMerge } from "../src/auth/core/deep-merge";

describe("deepMerge", () => {
  test("should merge two flat objects", () => {
    const a = { x: 1 };
    const b = { y: 2 };

    const result = deepMerge(a, b);

    expect(result).toEqual({ x: 1, y: 2 });
  });

  test("should merge nested objects without overwriting", () => {
    const a = { user: { name: "John", age: 30 } };
    const b = { user: { age: 31 } };

    const result = deepMerge(a, b);

    expect(result).toEqual({
      user: { name: "John", age: 31 },
    });
  });

  test("should replace arrays instead of merging them", () => {
    const a = { roles: ["USER"] };
    const b = { roles: ["ADMIN"] };

    const result = deepMerge(a, b);

    expect(result).toEqual({ roles: ["ADMIN"] });
  });

  test("should override primitive values", () => {
    const a = { enabled: true };
    const b = { enabled: false };

    const result = deepMerge(a, b);

    expect(result).toEqual({ enabled: false });
  });

  test("should handle null and undefined correctly", () => {
    const a = { config: { retries: 3 } };
    const b = { config: null };

    const result = deepMerge(a, b);

    expect(result).toEqual({ config: null });
  });

  test("should not mutate original objects", () => {
    const a = { x: { y: 1 } };
    const b = { x: { z: 2 } };

    const result = deepMerge(a, b);

    expect(result).toEqual({ x: { y: 1, z: 2 } });
    expect(a).toEqual({ x: { y: 1 } });
    expect(b).toEqual({ x: { z: 2 } });
  });
});
