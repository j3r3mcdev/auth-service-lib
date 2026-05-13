import { userAgentFilteringCheck } from "../user-agent-filtering-check";
import { MockUserAgentDetector } from "../../../../security/waf/detectors/user-agent/mock-detector";

describe("userAgentCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockUserAgentDetector({ "curl/8.0": true });
    const middleware = userAgentFilteringCheck(detector);

    const req: any = {
      headers: { "user-agent": "curl/8.0" },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalled();
    expect(next).not.toHaveBeenCalled();
  });

  it("laisse passer quand le détecteur renvoie false", () => {
    const detector = new MockUserAgentDetector({ "Mozilla/5.0": false });
    const middleware = userAgentFilteringCheck(detector);

    const req: any = {
      headers: { "user-agent": "Mozilla/5.0" },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
