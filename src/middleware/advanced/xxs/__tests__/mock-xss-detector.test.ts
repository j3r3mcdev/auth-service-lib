import { MockXssDetector } from "../detectors/mock-xss-detector";

describe("MockXssDetector", () => {
  it("retourne la valeur mockée", () => {
    const detector = new MockXssDetector({ test: true });
    expect(detector.detect("test")).toBe(true);
  });

  it("retourne false si non défini", () => {
    const detector = new MockXssDetector({});
    expect(detector.detect("anything")).toBe(false);
  });
});
