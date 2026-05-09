import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

// Chemins explicitement interdits (scanners, bots, attaques courantes)
const BLOCKED_PATHS = [
  "/wp-admin",
  "/phpmyadmin",
  "/admin",
  "/.env",
  "/server-status",
];

export function pathNormalization(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const path = req.url || "/";

  // 1. Traversal direct
  if (path.includes("../") || path.includes("..\\")) {
    return res.status(400).json({
      error: "Path traversal detected",
    });
  }

  // 2. Traversal encodé
  const lower = path.toLowerCase();
  if (
    lower.includes("%2e%2e") ||
    lower.includes("%2e/") ||
    lower.includes("/%2e")
  ) {
    return res.status(400).json({
      error: "Encoded path traversal detected",
    });
  }

  // 3. Double slash suspect
  if (path.includes("//")) {
    return res.status(400).json({
      error: "Invalid path format",
    });
  }

  // 4. Caractères dangereux
  if (/[<>|{}]/.test(path)) {
    return res.status(400).json({
      error: "Invalid characters in path",
    });
  }

  // 5. Chemins interdits connus
  if (BLOCKED_PATHS.includes(path)) {
    return res.status(403).json({
      error: "Forbidden path",
    });
  }

  next();
}
