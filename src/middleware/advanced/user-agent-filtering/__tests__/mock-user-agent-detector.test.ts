import { MockUserAgentDetector } from "../detectors/mock-user-agent-detector";

describe("MockUserAgentDetector", () => {
  it("retourne true pour un user-agent mocké comme dangereux", () => {
    const detector = new MockUserAgentDetector({
      "curl/7.88.1": true,
    });

    expect(detector.isMalicious("curl/7.88.1")).toBe(true);
  });

  it("retourne false pour un user-agent mocké comme safe", () => {
    const detector = new MockUserAgentDetector({
      "Mozilla/5.0": false,
    });

    expect(detector.isMalicious("Mozilla/5.0")).toBe(false);
  });

  it("retourne false si le user-agent n'est pas dans la map", () => {
    const detector = new MockUserAgentDetector({});

    expect(detector.isMalicious("Chrome/123.0")).toBe(false);
  });

  it("retourne false si user-agent est undefined", () => {
    const detector = new MockUserAgentDetector({});

    expect(detector.isMalicious(undefined as any)).toBe(false);
  });
});
