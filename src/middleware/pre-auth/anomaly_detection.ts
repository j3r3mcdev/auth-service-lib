import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../middleware-types";

interface AnomalyState {
  userAgents: Set<string>;
  paths: string[];
  lastRequests: number[];
}

const anomalyMap = new Map<string, AnomalyState>();

const WINDOW_MS = 10_000; // 10 secondes
const MAX_PATH_VARIETY = 15;
const MAX_USER_AGENT_VARIETY = 5;

export function anomalyDetection(
  req: MiddlewareRequest,
  res: MiddlewareResponse,
  next: MiddlewareNext,
) {
  const ip = req.ip || "unknown";
  const now = Date.now();

  const state = anomalyMap.get(ip) || {
    userAgents: new Set<string>(),
    paths: [],
    lastRequests: [],
  };

  // 1. User-Agent variety
  const ua = req.headers["user-agent"] || "unknown";
  state.userAgents.add(ua);

  if (state.userAgents.size > MAX_USER_AGENT_VARIETY) {
    return res.status(403).json({
      error: "Anomalous behavior detected: too many User-Agent changes",
    });
  }

  // 2. Path variety
  const path = req.url || "/";
  state.paths.push(path);

  if (state.paths.length > MAX_PATH_VARIETY) {
    return res.status(403).json({
      error: "Anomalous behavior detected: too many different paths",
    });
  }

  // 3. Request frequency (simple anomaly)
  state.lastRequests = state.lastRequests.filter((ts) => ts > now - WINDOW_MS);
  state.lastRequests.push(now);

  if (state.lastRequests.length > 50) {
    return res.status(403).json({
      error: "Anomalous behavior detected: suspicious request frequency",
    });
  }

  anomalyMap.set(ip, state);
  next();
}
