import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { XssDetector } from "./xss-detector";

export function xssCheck(detector: XssDetector) {
  return function (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) {
    const inputs: string[] = [];

    // Query
    if (req.query) {
      for (const value of Object.values(req.query)) {
        if (typeof value === "string") inputs.push(value);
      }
    }

    // Body
    if (req.body) {
      for (const value of Object.values(req.body)) {
        if (typeof value === "string") inputs.push(value);
      }
    }

    // Params
    if (req.params) {
      for (const value of Object.values(req.params)) {
        if (typeof value === "string") inputs.push(value);
      }
    }

    // Headers sensibles
    const sensitiveHeaders = ["user-agent", "referer", "x-forwarded-for"];
    for (const header of sensitiveHeaders) {
      const value = req.headers?.[header];
      if (typeof value === "string") inputs.push(value);
    }

    // Détection
    for (const input of inputs) {
      if (detector.detect(input)) {
        return res.status(403).json({
          error: "XSS detected",
          input,
        });
      }
    }

    next();
  };
}
