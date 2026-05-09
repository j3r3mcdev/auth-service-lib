import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

// Méthodes HTTP autorisées
const ALLOWED_METHODS = ["GET", "POST", "PUT", "PATCH", "DELETE"];

export function methodEnforcement(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const method = req.method?.toUpperCase() || "GET";

  if (!ALLOWED_METHODS.includes(method)) {
    return res.status(405).json({
      error: `HTTP method not allowed: ${method}`,
    });
  }

  next();
}
