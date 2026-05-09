import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

const PRIVATE_IP_RANGES = [
  /^127\./, // loopback
  /^10\./, // private class A
  /^192\.168\./, // private class C
  /^172\.(1[6-9]|2\d|3[0-1])\./, // private class B
];

export function ipCheck(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const ip = req.ip || "";

  const isPrivate = PRIVATE_IP_RANGES.some((regex) => regex.test(ip));

  if (isPrivate) {
    return res.status(403).json({
      error: "Access denied from private or invalid IP",
    });
  }

  next();
}
