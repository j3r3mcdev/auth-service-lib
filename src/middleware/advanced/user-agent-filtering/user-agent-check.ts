import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { UserAgentDetector } from "./user-agent-detector";

export function userAgentCheck(detector: UserAgentDetector) {
  return function (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) {
    const ua = req.headers?.["user-agent"];

    if (typeof ua === "string" && detector.detect(ua)) {
      return res.status(403).json({
        error: "Blocked User-Agent",
        userAgent: ua,
      });
    }

    next();
  };
}
