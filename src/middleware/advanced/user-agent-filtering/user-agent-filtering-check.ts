import { MiddlewareFunction } from "../../middleware-types";
import { UserAgentDetector } from "./user-agent-detector";

export function userAgentFilteringCheck(
  detector: UserAgentDetector,
): MiddlewareFunction {
  return (req, res, next) => {
    const rawUa = req.headers["user-agent"];
    const ua = Array.isArray(rawUa) ? rawUa[0] : rawUa;

    if (detector.detect(ua)) {
      return res.status(403).json({
        error: "Forbidden: Suspicious User-Agent detected",
      });
    }

    next();
  };
}
