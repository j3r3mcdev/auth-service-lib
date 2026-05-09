import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { RfiDetector } from "./rfi-detector";

export function rfiCheck(detector: RfiDetector) {
  return function (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) {
    const inputs: string[] = [];

    // URL
    if (req.url) {
      inputs.push(req.url);
    }

    // Query params
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

    // Détection
    for (const input of inputs) {
      if (detector.detect(input)) {
        return res.status(403).json({
          error: "RFI detected",
          input,
        });
      }
    }

    next();
  };
}
