import { BasicRfiDetector } from "../detectors/basic-rfi-detector";

describe("BasicRfiDetector", () => {
  it("détecte les patterns RFI dangereux", () => {
    const detector = new BasicRfiDetector();

    expect(detector.detect("http://evil.com/shell.txt")).toBe(true);
    expect(detector.detect("https://attacker.com/file.php")).toBe(true);
    expect(detector.detect("ftp://malicious.com/file")).toBe(true);
    expect(detector.detect("php://input")).toBe(true);
    expect(detector.detect("file://etc/passwd")).toBe(true);
  });

  it("ignore les valeurs sûres", () => {
    const detector = new BasicRfiDetector();

    expect(detector.detect("/api/users")).toBe(false);
    expect(detector.detect("/static/image.png")).toBe(false);
    expect(detector.detect("local/path/file.txt")).toBe(false);
  });

  it("retourne false si input est vide", () => {
    const detector = new BasicRfiDetector();

    expect(detector.detect("")).toBe(false);
  });
});
