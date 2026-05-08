import { validateEmail, validatePassword } from "../src/utils/validators";

describe("validators", () => {
  it("validates a correct email", () => {
    expect(validateEmail("test@example.com")).toBe(true);
  });

  it("rejects invalid emails", () => {
    expect(validateEmail("invalid")).toBe(false);
    expect(validateEmail("test@")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
  });

  it("validates strong passwords", () => {
    expect(validatePassword("Abc123!!")).toBe(true);
  });

  it("rejects weak passwords", () => {
    expect(validatePassword("abc")).toBe(false);
    expect(validatePassword("123456")).toBe(false);
    expect(validatePassword("password")).toBe(false);
  });
});
