import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

export function headerValidation(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const headers = req.headers;

  // 1. Host header (obligatoire en HTTP/1.1)
  if (!headers["host"]) {
    return res.status(400).json({
      error: "Missing Host header",
    });
  }

  // 2. Accept header
  if (!headers["accept"]) {
    return res.status(400).json({
      error: "Missing Accept header",
    });
  }

  // 3. Content-Type (uniquement si body attendu)
  const method = req.method?.toUpperCase() || "GET";
  const needsBody = ["POST", "PUT", "PATCH"].includes(method);

  if (needsBody && !headers["content-type"]) {
    return res.status(400).json({
      error: "Missing Content-Type header",
    });
  }

  next();
}
