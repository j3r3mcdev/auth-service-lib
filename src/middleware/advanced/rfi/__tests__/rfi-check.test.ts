import { rfiCheck } from "../rfi-check";
import { MockRfiDetector } from "../detectors/mock-rfi-detector";

describe("rfiCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockRfiDetector({
      "http://evil.com": true,
    });

    const middleware = rfiCheck(detector);

    const req: any = {
      url: "http://evil.com",
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "RFI detected",
      input: "http://evil.com",
    });

    expect(next).not.toHaveBeenCalled();
  });

  it("laisse passer quand le détecteur renvoie false", () => {
    const detector = new MockRfiDetector({
      "/safe/path": false,
    });

    const middleware = rfiCheck(detector);

    const req: any = {
      url: "/safe/path",
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
