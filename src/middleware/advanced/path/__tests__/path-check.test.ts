import { pathCheck } from "../path-check";
import { MockPathTraversalDetector } from "../detectors/mock-path-detector";

describe("pathCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockPathTraversalDetector({
      "../etc/passwd": true,
    });

    const middleware = pathCheck(detector);

    const req: any = { url: "../etc/passwd" };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Forbidden: Path Traversal detected",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("laisse passer quand le détecteur renvoie false", () => {
    const detector = new MockPathTraversalDetector({
      "/safe/path": false,
    });

    const middleware = pathCheck(detector);

    const req: any = { url: "/safe/path" };

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
