import { RegexSqlInjectionDetector } from "../detectors/regex-sqli-detector";

describe("RegexSqlInjectionDetector - patterns invalides", () => {
  const detector = new RegexSqlInjectionDetector();

  it("ne détecte pas une phrase normale", () => {
    expect(detector.detect("bonjour comment vas-tu ?")).toBe(false);
    expect(detector.detect("je veux sélectionner un personnage")).toBe(false);
    expect(detector.detect("please select your character")).toBe(false);
  });

  it("ne détecte pas des mots contenant des fragments SQL", () => {
    expect(detector.detect("selection")).toBe(false);
    expect(detector.detect("universe")).toBe(false);
    expect(detector.detect("unionized workers")).toBe(false);
    expect(detector.detect("dropbox folder")).toBe(false);
  });

  it("ne détecte pas des nombres ou symboles sans danger", () => {
    expect(detector.detect("123456")).toBe(false);
    expect(detector.detect("+-*/")).toBe(false);
    expect(detector.detect("hello_world")).toBe(false);
  });

  it("ne détecte pas des champs vides ou null", () => {
    expect(detector.detect("")).toBe(false);
    expect(detector.detect(" ")).toBe(false);
    expect(detector.detect("\n")).toBe(false);
  });

  it("détecte les vraies attaques SQLi", () => {
    // UNION-based
    expect(detector.detect("UNION SELECT username, password FROM users")).toBe(
      true,
    );
    expect(detector.detect("union all select 1,2,3")).toBe(true);

    // Boolean-based
    expect(detector.detect("' OR '1'='1")).toBe(true);
    expect(detector.detect("admin' or 1=1 --")).toBe(true);

    // Error-based
    expect(detector.detect("extractvalue(1, concat(0x7e, version()))")).toBe(
      true,
    );
    expect(detector.detect("updatexml(1, concat(0x7e, database()), 1)")).toBe(
      true,
    );

    // Time-based
    expect(detector.detect("sleep(5)")).toBe(true);
    expect(detector.detect("pg_sleep(3)")).toBe(true);

    // Stacked queries
    expect(detector.detect("1; DROP TABLE users")).toBe(true);
    expect(detector.detect("0; INSERT INTO logs VALUES ('hack')")).toBe(true);

    // Dangerous sequences
    expect(detector.detect("SELECT * FROM accounts")).toBe(true);
    expect(detector.detect("DROP TABLE sessions")).toBe(true);
  });
});
