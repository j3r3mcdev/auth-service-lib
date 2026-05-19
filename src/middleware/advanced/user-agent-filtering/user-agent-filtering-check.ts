import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { UserAgentDetector } from "./user-agent-detector";

export function userAgentCheck(detector: UserAgentDetector) {
  return (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) => {
    const rawUA = req.headers["user-agent"];
    const userAgent = Array.isArray(rawUA) ? rawUA[0] : (rawUA ?? "");

    if (!userAgent || userAgent.trim() === "") {
      return res.status(400).json({
        error: "Missing User-Agent header",
      });
    }

    if (detector.isMalicious(userAgent)) {
      return res.status(403).json({
        error: "Forbidden User-Agent",
      });
    }

    next();
  };
}
