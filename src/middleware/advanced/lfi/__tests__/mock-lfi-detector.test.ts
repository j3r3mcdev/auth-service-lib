import { MockLfiDetector } from "../detectors/mock-lfi-detector";

describe("MockLfiDetector", () => {
  it("retourne true pour un input mocké comme dangereux", () => {
    const detector = new MockLfiDetector({
      "../etc/passwd": true,
    });

    expect(detector.detect("../etc/passwd")).toBe(true);
  });

  it("retourne false pour un input mocké comme safe", () => {
    const detector = new MockLfiDetector({
      "/safe/path": false,
    });

    expect(detector.detect("/safe/path")).toBe(false);
  });

  it("retourne false si l'input n'est pas dans la map", () => {
    const detector = new MockLfiDetector({});
    expect(detector.detect("unknown")).toBe(false);
  });
});
