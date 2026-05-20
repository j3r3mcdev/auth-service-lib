import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { XssDetector } from "./xss-detector";

export function xssCheck(detector: XssDetector) {
  return function xssCheckMiddleware(
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) {
    const inputs: string[] = [];

    // 1. Body
    if (req.body) {
      for (const value of Object.values(req.body)) {
        if (typeof value === "string") inputs.push(value);
      }
    }

    // 2. Query
    if (req.query) {
      for (const value of Object.values(req.query)) {
        if (typeof value === "string") inputs.push(value);
      }
    }

    // 3. Params
    if (req.params) {
      for (const value of Object.values(req.params)) {
        if (typeof value === "string") inputs.push(value);
      }
    }

    // 4. Headers sensibles
    const sensitiveHeaders = ["user-agent", "referer", "x-forwarded-for"];
    for (const header of sensitiveHeaders) {
      const value = req.headers[header];
      if (typeof value === "string") inputs.push(value);
    }

    console.log("XSS INPUTS AFTER =", inputs);

    // Détection via provider avancé
    for (const input of inputs) {
      try {
        if (detector.detect(input)) {
          return res.status(403).json({
            error: "XSS detected",
            input,
          });
        }
      } catch (err) {
        return res.status(403).json({
          error: "XSS detected",
          reason: "provider-error",
          input,
        });
      }
    }

    next();
  };
}
