import { BasicUserAgentDetector } from "../detectors/basic-user-agent-detector";

describe("BasicUserAgentDetector", () => {
  it("bloque les user-agents connus comme dangereux", () => {
    const detector = new BasicUserAgentDetector();

    expect(detector.detect("curl/7.88.1")).toBe(true);
    expect(detector.detect("Wget/1.21")).toBe(true);
    expect(detector.detect("python-requests/2.31")).toBe(true);
    expect(detector.detect("Googlebot")).toBe(true);
  });

  it("autorise les user-agents normaux", () => {
    const detector = new BasicUserAgentDetector();

    expect(detector.detect("Mozilla/5.0")).toBe(false);
    expect(detector.detect("Chrome/123.0")).toBe(false);
    expect(detector.detect("Safari/17.0")).toBe(false);
  });

  it("retourne false si user-agent est undefined", () => {
    const detector = new BasicUserAgentDetector();

    expect(detector.detect(undefined)).toBe(false);
  });
});
