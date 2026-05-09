import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

// Types autorisés pour les requêtes avec body
const ALLOWED_CONTENT_TYPES = [
  "application/json",
  "application/x-www-form-urlencoded",
];

export function contentTypeCheck(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const method = req.method?.toUpperCase() || "GET";
  const contentType = req.headers["content-type"];

  const needsBody = ["POST", "PUT", "PATCH"].includes(method);

  // 1. Si un body est attendu → Content-Type obligatoire
  if (needsBody && !contentType) {
    return res.status(400).json({
      error: "Missing Content-Type header",
    });
  }

  // 2. Si Content-Type existe → vérifier qu'il est autorisé
  if (contentType && !ALLOWED_CONTENT_TYPES.includes(contentType)) {
    return res.status(415).json({
      error: `Unsupported Content-Type: ${contentType}`,
    });
  }

  next();
}
