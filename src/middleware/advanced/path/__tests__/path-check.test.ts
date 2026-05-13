import { pathCheck } from "../path-check";
import { MockPathTraversalDetector } from "../../../../security/waf/detectors/path/mock-detector";

describe("pathCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockPathTraversalDetector({ "../etc/passwd": true });
    const middleware = pathCheck(detector);

    const req: any = {
      query: { file: "../etc/passwd" },
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
    const detector = new MockPathTraversalDetector({
      "images/photo.png": false,
    });
    const middleware = pathCheck(detector);

    const req: any = {
      query: { file: "images/photo.png" },
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
