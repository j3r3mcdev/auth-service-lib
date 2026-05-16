import { BasicSqlInjectionDetector } from "../detectors/basic-sqli-detector";

describe("BasicSqlInjectionDetector", () => {
  it("détecte un pattern SQLi simple", () => {
    const detector = new BasicSqlInjectionDetector();

    const payload = "UNION SELECT * FROM users";

    expect(detector.detect(payload)).toBe(true);
  });

  it("ne détecte pas un texte légitime", () => {
    const detector = new BasicSqlInjectionDetector();

    const payload = "please select your character";

    expect(detector.detect(payload)).toBe(false); // ← FIX
  });

  it("retourne false pour une valeur vide", () => {
    const detector = new BasicSqlInjectionDetector();

    expect(detector.detect("")).toBe(false);
    expect(detector.detect(undefined as any)).toBe(false);
    expect(detector.detect(null as any)).toBe(false);
  });

  it("détecte les attaques SQLi évidentes", () => {
    const detector = new BasicSqlInjectionDetector();

    // Boolean-based
    expect(detector.detect("' OR '1'='1")).toBe(true);
    expect(detector.detect("admin' or 1=1 --")).toBe(true);

    // Union-based
    expect(detector.detect("UNION SELECT 1,2,3")).toBe(true);

    // Time-based
    expect(detector.detect("sleep(5)")).toBe(true);

    // Stacked queries
    expect(detector.detect("1; DROP TABLE users")).toBe(true);

    // Dangerous sequences
    expect(detector.detect("SELECT * FROM accounts")).toBe(true);
    expect(detector.detect("DROP TABLE sessions")).toBe(true);
  });
});
