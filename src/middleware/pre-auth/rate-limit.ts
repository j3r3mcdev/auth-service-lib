import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

const RATE_LIMIT_WINDOW_MS = 10_000; // 10 secondes
const RATE_LIMIT_MAX_REQUESTS = 20; // 20 requêtes par IP

// Mémoire locale : { ip: [timestamps] }
const requestHistory = new Map<string, number[]>();

export function rateLimit(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const ip = req.ip || "unknown";

  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;

  // Récupérer l'historique de l'IP
  const history = requestHistory.get(ip) || [];

  // Garder uniquement les timestamps récents
  const recentRequests = history.filter((ts) => ts > windowStart);

  // Ajouter la requête actuelle
  recentRequests.push(now);

  // Sauvegarder
  requestHistory.set(ip, recentRequests);

  // Vérifier la limite
  if (recentRequests.length > RATE_LIMIT_MAX_REQUESTS) {
    return res.status(429).json({
      error: "Too many requests",
    });
  }

  next();
}
