import { Request, Response, NextFunction } from "express";
import { XssDetector } from "../middleware/advanced/xxs/xss-detector";
import { xssCheck } from "../middleware/advanced/xxs/xss-check";

export function expressXss(detector: XssDetector) {
  const middleware = xssCheck(detector);

  return (req: Request, res: Response, next: NextFunction) => {
    middleware(
      {
        method: req.method,
        url: req.url,
        originalUrl: req.originalUrl,
        path: req.path,
        ip: req.ip,
        query: req.query,
        body: req.body,
        params: req.params,
        headers: req.headers,
      },
      {
        status: (code: number) => res.status(code),
        json: (data: any) => res.json(data),
      },
      next,
    );
  };
}
