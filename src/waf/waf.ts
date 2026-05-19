import {
  pathNormalization,
  methodEnforcement,
  contentTypeCheck,
  headerValidation,
  ipCheck,
  rateLimit,
  anomalyDetection,
} from "../middleware";

import {
  geoIpCheck,
  userAgentCheck,
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

import { UserAgentDetector } from "../middleware/advanced/user-agent-filtering/user-agent-detector";

export interface WafConfig {
  geoIpProvider: GeoIpProvider;
  blockedCountries?: string[];

  userAgentDetector: UserAgentDetector;
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
  ipCheck,
  rateLimit,
  anomalyDetection,

  // 2. ADVANCED (factories)
  geoIpCheck(config.geoIpProvider, config.blockedCountries ?? []),
  userAgentCheck(config.userAgentDetector),
  sqliCheck(config.sqliDetector),
  xssCheck(config.xssDetector),
  lfiCheck(config.lfiDetector),
  rfiCheck(config.rfiDetector),
  pathCheck(config.pathDetector),
];
