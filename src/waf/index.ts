import {
  pathNormalization,
  methodEnforcement,
  contentTypeCheck,
  headerValidation,
  basicUserAgentCheck,
  ipCheck,
  rateLimit,
  anomalyDetection,
} from "../middleware";

import {
  geoIpCheck,
  sqliCheck,
  xssCheck,
  lfiCheck,
  rfiCheck,
  pathCheck,
} from "../middleware/advanced";

import {
  GeoIpProvider,
  SqlInjectionDetector,
  XssDetector,
  LfiDetector,
  RfiDetector,
  PathTraversalDetector,
} from "../middleware/advanced";

export interface WafConfig {
  geoIpProvider: GeoIpProvider;
  blockedCountries?: string[];

  sqliDetector: SqlInjectionDetector;
  xssDetector: XssDetector;
  lfiDetector: LfiDetector;
  rfiDetector: RfiDetector;
  pathDetector: PathTraversalDetector;
}

export const createWafPipeline = (config: WafConfig) => [
  // 1. PRE-AUTH (middlewares directs)
  pathNormalization,
  methodEnforcement,
  contentTypeCheck,
  headerValidation,
  basicUserAgentCheck,
  ipCheck,
  rateLimit,
  anomalyDetection,

  // 2. ADVANCED (factories)
  geoIpCheck(config.geoIpProvider, config.blockedCountries ?? []),
  sqliCheck(config.sqliDetector),
  xssCheck(config.xssDetector),
  lfiCheck(config.lfiDetector),
  rfiCheck(config.rfiDetector),
  pathCheck(config.pathDetector),
];
