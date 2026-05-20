import { xssCheck } from "../xss-check";
import { XssDetector } from "../xss-detector";

function mockReq(data: any = {}) {
  return {
    query: data.query || {},
    body: data.body || {},
    params: data.params || {},
    headers: data.headers || {},
  };
}

function mockRes() {
  return {
    statusCode: 200,
    jsonPayload: null,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: any) {
      this.jsonPayload = payload;
      return this;
    },
  };
}

describe("xssCheck middleware (advanced)", () => {
  it("laisse passer quand detect() renvoie false", () => {
    const detector: XssDetector = {
      detect: () => false,
    };

    const middleware = xssCheck(detector);

    const req: any = {
      body: { payload: "<script>alert(1)</script>" },
      query: {},
      params: {},
      headers: {}, // ← indispensable
    };

    const res = mockRes();
    let nextCalled = false;

    middleware(req as any, res as any, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(true);
    expect(res.statusCode).toBe(200);
    expect(res.jsonPayload).toBe(null);
  });

  it("bloque quand detect() renvoie true", () => {
    const detector: XssDetector = {
      detect: () => true,
    };

    const middleware = xssCheck(detector);

    const req = mockReq({
      body: { comment: "<script>alert(1)</script>" },
    });

    const res = mockRes();
    let nextCalled = false;

    middleware(req as any, res as any, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(false);
    expect(res.statusCode).toBe(403);
    expect(res.jsonPayload).toEqual({
      error: "XSS detected",
      input: "<script>alert(1)</script>",
    });
  });

  it("teste aussi query, params et headers", () => {
    const detector: XssDetector = {
      detect: (input) => input === "BAD",
    };

    const middleware = xssCheck(detector);

    const req = mockReq({
      query: { q: "OK" },
      params: { id: "BAD" },
      headers: { "user-agent": "OK" },
    });

    const res = mockRes();
    let nextCalled = false;

    middleware(req as any, res as any, () => {
      nextCalled = true;
    });

    expect(nextCalled).toBe(false);
    expect(res.statusCode).toBe(403);
    expect(res.jsonPayload).toEqual({
      error: "XSS detected",
      input: "BAD",
    });
  });
});
