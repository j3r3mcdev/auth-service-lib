import { userAgentFilteringCheck } from "../user-agent-filtering-check";
import { MockUserAgentDetector } from "../detectors/mock-user-agent-detector";

describe("userAgentFilteringCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockUserAgentDetector({
      "curl/7.88.1": true,
    });

    const middleware = userAgentFilteringCheck(detector);

    const req: any = {
      headers: { "user-agent": "curl/7.88.1" },
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Forbidden: Suspicious User-Agent detected",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("laisse passer quand le détecteur renvoie false", () => {
    const detector = new MockUserAgentDetector({
      "Mozilla/5.0": false,
    });

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
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
