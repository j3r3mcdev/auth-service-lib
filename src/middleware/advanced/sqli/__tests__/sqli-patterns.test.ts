import { SQLI_PATTERNS } from "../patterns/sqli-patterns";

describe("SQLI_PATTERNS", () => {
  it("contient au moins un pattern SQLi", () => {
    expect(Array.isArray(SQLI_PATTERNS)).toBe(true);
    expect(SQLI_PATTERNS.length).toBeGreaterThan(0);
  });
});
