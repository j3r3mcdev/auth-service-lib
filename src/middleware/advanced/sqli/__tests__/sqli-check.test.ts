import { sqliCheck } from "../sqli-check";
import { MockSqlInjectionDetector } from "../mock-sqli-detector";

describe("sqliCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockSqlInjectionDetector({ "SELECT *": true });
    const middleware = sqliCheck(detector);

    const req: any = {
      query: { q: "SELECT *" },
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
    const detector = new MockSqlInjectionDetector({ hello: false });
    const middleware = sqliCheck(detector);

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
