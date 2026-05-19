import { Request, Response, NextFunction } from "express";
import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware/middleware-types";
import { sqliCheck } from "../middleware/advanced/sqli/sqli-check";
import { SqlInjectionDetector } from "../middleware/advanced/sqli/sqli-detector";

export function expressSqli(detector: SqlInjectionDetector) {
  const middleware = sqliCheck(detector);

  return (req: Request, res: Response, next: NextFunction) => {
    const adaptedReq: MiddlewareRequest = {
      method: req.method,
      url: req.url,
      originalUrl: req.originalUrl,
      path: req.path,
      ip: req.ip,
      headers: req.headers as Record<string, string | undefined>,
      body: req.body,
      query: req.query,
      params: req.params,
    };

    const adaptedRes: MiddlewareResponse = {
      status: (code: number) => {
        res.status(code);
        return adaptedRes;
      },
      json: (payload: any) => {
        res.json(payload);
      },
    };

    const adaptedNext: MiddlewareNext = () => next();

    middleware(adaptedReq, adaptedRes, adaptedNext);
  };
}
