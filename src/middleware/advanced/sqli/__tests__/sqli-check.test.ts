import { sqliCheck } from "../sqli-check";
import { MockSqlInjectionDetector } from "../detectors/mock-sqli-detector";
import { RegexSqlInjectionDetector } from "../detectors/regex-sqli-detector";

describe("sqliCheck middleware", () => {
  it("bloque quand le détecteur renvoie true", () => {
    const detector = new MockSqlInjectionDetector(true); // ← FIX

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
    const detector = new MockSqlInjectionDetector(false); // ← FIX

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

  describe("sqliCheck middleware – SQLi valides", () => {
    it("bloque une attaque SQLi dans query", () => {
      const detector = new RegexSqlInjectionDetector();
      const middleware = sqliCheck(detector);

      const req: any = {
        query: { q: "UNION SELECT * FROM users" },
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

    it("bloque une attaque SQLi dans body", () => {
      const detector = new RegexSqlInjectionDetector();
      const middleware = sqliCheck(detector);

      const req: any = {
        query: {},
        body: { username: "' OR '1'='1" },
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

    it("bloque une attaque SQLi dans params", () => {
      const detector = new RegexSqlInjectionDetector();
      const middleware = sqliCheck(detector);

      const req: any = {
        query: {},
        body: {},
        params: { id: "1; DROP TABLE users" },
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

    it("bloque une attaque SQLi dans les headers", () => {
      const detector = new RegexSqlInjectionDetector();
      const middleware = sqliCheck(detector);

      const req: any = {
        query: {},
        body: {},
        params: {},
        headers: { "x-custom": "sleep(5)" },
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
  });
});
