import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { SqlInjectionDetector } from "./sqli-detector";

export function sqliCheck(detector: SqlInjectionDetector) {
  return (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) => {
    const values: string[] = [];

    // Body
    if (req.body) {
      values.push(...Object.values(req.body).map(String));
    }

    // Query
    if (req.query) {
      values.push(...Object.values(req.query).map(String));
    }

    // Params
    if (req.params) {
      values.push(...Object.values(req.params).map(String));
    }

    // Headers
    if (req.headers) {
      values.push(...Object.values(req.headers).map(String));
    }
    console.log("SQLI VALUES =", values);

    // Détection
    for (const value of values) {
      if (detector.detect(value)) {
        return res.status(403).json({
          error: "SQL Injection detected",
        });
      }
    }

    next();
  };
}
