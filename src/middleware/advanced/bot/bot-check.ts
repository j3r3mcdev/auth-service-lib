import { BotDetector } from "./bot-detector";
import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";

export function botCheck(detector: BotDetector) {
  return (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) => {
    const ua = req.headers["user-agent"];
    const userAgent = Array.isArray(ua) ? ua[0] : (ua ?? "");

    if (detector.isBot(userAgent)) {
      return res.status(403).json({ error: "Bot detected" });
    }

    next();
  };
}
