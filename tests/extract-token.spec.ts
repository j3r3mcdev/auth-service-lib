import { defaultExtractTokenFromAuthorizationHeader } from "../src/auth/extract/default-extract-token";

describe("defaultExtractTokenFromAuthorizationHeader", () => {
  const mockReq = (headers: any) => ({ headers });

  test("should extract token from Authorization header", () => {
    const req = mockReq({ authorization: "Bearer abc123" });

    const token = defaultExtractTokenFromAuthorizationHeader(req);

    expect(token).toBe("abc123");
  });

  test("should return null if Authorization header is missing", () => {
    const req = mockReq({});

    const token = defaultExtractTokenFromAuthorizationHeader(req);

    expect(token).toBeNull();
  });

  test("should return null if Authorization header is not a string", () => {
    const req = mockReq({ authorization: 123 });

    const token = defaultExtractTokenFromAuthorizationHeader(req);

    expect(token).toBeNull();
  });

  test("should return null if Authorization header is malformed", () => {
    const req = mockReq({ authorization: "Bearer" }); // pas de token

    const token = defaultExtractTokenFromAuthorizationHeader(req);

    expect(token).toBeNull();
  });

  test("should return null if scheme is not Bearer", () => {
    const req = mockReq({ authorization: "Token abc123" });

    const token = defaultExtractTokenFromAuthorizationHeader(req);

    expect(token).toBeNull();
  });

  test("should accept Authorization with capital A", () => {
    const req = mockReq({ Authorization: "Bearer xyz789" });

    const token = defaultExtractTokenFromAuthorizationHeader(req);

    expect(token).toBe("xyz789");
  });
});
