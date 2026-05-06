import { generateToken, verifyToken } from "../src/tokens";

describe("tokens", () => {
  it("generates a valid token", () => {
    const token = generateToken({ id: 1 }, "secret", "1h");
    expect(typeof token).toBe("string");
  });

  it("verifies a token (success)", () => {
    const token = generateToken({ id: 1 }, "secret", "1h");
    const payload = verifyToken(token, "secret");
    expect(payload.id).toBe(1);
  });

  it("fails with wrong secret", () => {
    const token = generateToken({ id: 1 }, "secret", "1h");
    expect(() => verifyToken(token, "wrong")).toThrow();
  });

  it("fails with invalid token", () => {
    expect(() => verifyToken("invalid.token", "secret")).toThrow();
  });
});
