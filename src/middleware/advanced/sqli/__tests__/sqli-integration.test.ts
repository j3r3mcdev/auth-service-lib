import { RegexSqlInjectionDetector } from "../detectors/regex-sqli-detector";
import { sqliCheck } from "../sqli-check";

describe("SQLi Integration Test", () => {
  it("bloque une requête contenant une injection SQL", () => {
    const detector = new RegexSqlInjectionDetector();
    const middleware = sqliCheck(detector);

    const req: any = {
      body: {
        username: "admin",
        password: "UNION SELECT * FROM users",
      },
      query: {}, // ← IMPORTANT
      headers: {}, // ← IMPORTANT
    };

    const res: any = {
      statusCode: 200,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(payload: any) {
        this.payload = payload;
      },
    };

    let nextCalled = false;
    const next = () => {
      nextCalled = true;
    };

    middleware(req, res, next);

    expect(nextCalled).toBe(false);
    expect(res.statusCode).toBe(403);
  });

  it("laisse passer une requête légitime", () => {
    const detector = new RegexSqlInjectionDetector();
    const middleware = sqliCheck(detector);

    const req: any = {
      body: { username: "player1", password: "hello world" },
      query: {},
      headers: {},
    };

    const res: any = {
      statusCode: 200,
      status(code: number) {
        this.statusCode = code;
        return this;
      },
      json(payload: any) {
        this.payload = payload;
      },
    };

    let nextCalled = false;
    const next = () => {
      nextCalled = true;
    };

    middleware(req, res, next);

    expect(nextCalled).toBe(true);
    expect(res.statusCode).toBe(200);
  });
});
