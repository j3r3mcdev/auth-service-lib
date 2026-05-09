import { lfiCheck } from "../lfi-check";
import { MockLfiDetector } from "../detectors/mock-detector";

describe("lfiCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockLfiDetector({ "/etc/passwd": true });
    const middleware = lfiCheck(detector);

    const req: any = {
      query: { file: "/etc/passwd" },
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
    const detector = new MockLfiDetector({ "public/readme.txt": false });
    const middleware = lfiCheck(detector);

    const req: any = {
      query: { file: "public/readme.txt" },
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
