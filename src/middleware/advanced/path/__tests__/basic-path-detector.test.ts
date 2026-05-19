import { BasicPathTraversalDetector } from "../detectors/basic-path-detector";

describe("BasicPathTraversalDetector", () => {
  it("détecte les patterns de path traversal dangereux", () => {
    const detector = new BasicPathTraversalDetector();

    expect(detector.detect("../etc/passwd")).toBe(true);
    expect(detector.detect("..\\windows\\system32")).toBe(true);
    expect(detector.detect("%2e%2e%2fetc/passwd")).toBe(true);
    expect(detector.detect("..%5csecret")).toBe(true);
  });

  it("ignore les chemins normaux", () => {
    const detector = new BasicPathTraversalDetector();

    expect(detector.detect("/api/users")).toBe(false);
    expect(detector.detect("/static/logo.png")).toBe(false);
    expect(detector.detect("folder/subfolder/file.txt")).toBe(false);
  });

  it("retourne false si input est vide", () => {
    const detector = new BasicPathTraversalDetector();
    expect(detector.detect("")).toBe(false);
  });
});
