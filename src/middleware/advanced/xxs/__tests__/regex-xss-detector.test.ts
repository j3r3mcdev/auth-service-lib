import { RegexXssDetector } from "../detectors/regex-xss-detector";

describe("RegexXssDetector", () => {
  it("détecte un script XSS", () => {
    const detector = new RegexXssDetector();
    expect(detector.detect("<script>alert(1)</script>")).toBe(true);
  });

  it("ignore une chaîne safe", () => {
    const detector = new RegexXssDetector();
    expect(detector.detect("hello world")).toBe(false);
  });
});
