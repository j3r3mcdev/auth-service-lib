import { rfiCheck } from "../rfi-check";
import { MockRfiDetector } from "../mock-rfi-detector";

describe("rfiCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockRfiDetector({ "http://evil.com": true });
    const middleware = rfiCheck(detector);

    const req: any = {
      query: { file: "http://evil.com" },
      body: {},
      params: {},
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
    const detector = new MockRfiDetector({ "local.txt": false });
    const middleware = rfiCheck(detector);

    const req: any = {
      query: { file: "local.txt" },
      body: {},
      params: {},
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
