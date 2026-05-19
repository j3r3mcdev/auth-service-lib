import { userAgentCheck } from "../user-agent-filtering-check";
import { MockUserAgentDetector } from "../detectors/mock-user-agent-detector";

function mockReq(headers: any = {}) {
  return { headers } as any;
}

function mockRes() {
  return {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
  } as any;
}

describe("userAgentCheck middleware", () => {
  it("blocks missing UA", () => {
    const req = mockReq({});
    const res = mockRes();
    const next = jest.fn();

    const middleware = userAgentCheck(new MockUserAgentDetector({}));

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
  });

  it("blocks malicious UA", () => {
    const req = mockReq({ "user-agent": "curl/7.88.1" });
    const res = mockRes();
    const next = jest.fn();

    const middleware = userAgentCheck(
      new MockUserAgentDetector({
        "curl/7.88.1": true,
      }),
    );

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
  });

  it("allows clean UA", () => {
    const req = mockReq({ "user-agent": "Mozilla/5.0" });
    const res = mockRes();
    const next = jest.fn();

    const middleware = userAgentCheck(
      new MockUserAgentDetector({
        "Mozilla/5.0": false,
      }),
    );

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });
});
