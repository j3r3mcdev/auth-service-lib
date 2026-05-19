import { BasicXssDetector } from "../detectors/basic-xss-detector";

describe("BasicXssDetector", () => {
  it("détecte un pattern XSS simple", () => {
    const detector = new BasicXssDetector();
    expect(detector.detect("<script>alert(1)</script>")).toBe(true);
  });

  it("ignore une chaîne safe", () => {
    const detector = new BasicXssDetector();
    expect(detector.detect("hello world")).toBe(false);
  });
});
