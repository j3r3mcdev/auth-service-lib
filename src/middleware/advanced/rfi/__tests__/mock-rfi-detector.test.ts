import { MockRfiDetector } from "../detectors/mock-rfi-detector";

describe("MockRfiDetector", () => {
  it("retourne true pour un input mocké comme dangereux", () => {
    const detector = new MockRfiDetector({
      "http://evil.com": true,
    });

    expect(detector.detect("http://evil.com")).toBe(true);
  });

  it("retourne false pour un input mocké comme safe", () => {
    const detector = new MockRfiDetector({
      "/safe/path": false,
    });

    expect(detector.detect("/safe/path")).toBe(false);
  });

  it("retourne false si l'input n'est pas dans la map", () => {
    const detector = new MockRfiDetector({});

    expect(detector.detect("unknown")).toBe(false);
  });
});
