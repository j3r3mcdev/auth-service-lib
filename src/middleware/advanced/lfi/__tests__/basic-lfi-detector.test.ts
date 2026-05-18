import { BasicLfiDetector } from "../detectors/basic-lfi-detector";

describe("BasicLfiDetector", () => {
  it("détecte les patterns LFI dangereux", () => {
    const detector = new BasicLfiDetector();

    expect(detector.detect("../etc/passwd")).toBe(true);
    expect(detector.detect("/etc/shadow")).toBe(true);
    expect(detector.detect("C:\\Windows\\System32")).toBe(true);
    expect(detector.detect("%2e%2e%2fetc/passwd")).toBe(true);
  });

  it("ignore les valeurs sûres", () => {
    const detector = new BasicLfiDetector();

    expect(detector.detect("/api/users")).toBe(false);
    expect(detector.detect("/static/logo.png")).toBe(false);
    expect(detector.detect("normal/path/file.txt")).toBe(false);
  });

  it("retourne false si input est vide", () => {
    const detector = new BasicLfiDetector();
    expect(detector.detect("")).toBe(false);
  });
});
