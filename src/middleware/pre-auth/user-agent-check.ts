import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

export function basicUserAgentCheck(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const userAgent = req.headers["user-agent"];

  if (!userAgent || userAgent.trim() === "") {
    return res.status(400).json({
      error: "Missing or invalid User-Agent",
    });
  }

  next();
}
