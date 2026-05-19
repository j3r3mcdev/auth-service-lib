import { LfiDetector } from "./lfi-detector";
import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";

export function lfiCheck(detector: LfiDetector) {
  return (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) => {
    const value = req.url || req.originalUrl || "";

    if (detector.detect(value)) {
      return res.status(403).json({
        error: "Forbidden: Local File Inclusion detected",
      });
    }

    next();
  };
}
