import { sanitize } from "../src/sanitize";

describe("sanitize", () => {
  it("removes dangerous characters", () => {
    const result = sanitize("<script>alert(1)</script>");
    expect(result).not.toContain("<");
    expect(result).not.toContain(">");
  });

  it("returns empty string for null/undefined", () => {
    // @ts-expect-error test invalid input
    expect(sanitize(null)).toBe("");
  });

  it("keeps normal text intact", () => {
    expect(sanitize("Hello World")).toBe("Hello World");
  });
});
