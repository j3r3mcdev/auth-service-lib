import { xssCheck } from "../xss-check";
import { MockXssDetector } from "../detectors/mock-detector";

describe("xssCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockXssDetector({ "<script>alert(1)</script>": true });
    const middleware = xssCheck(detector);

    const req: any = {
      query: { q: "<script>alert(1)</script>" },
      body: {},
      params: {},
      headers: {},
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
    const detector = new MockXssDetector({ hello: false });
    const middleware = xssCheck(detector);

    const req: any = {
      query: { q: "hello" },
      body: {},
      params: {},
      headers: {},
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
