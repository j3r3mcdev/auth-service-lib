import { pathNormalization } from "../middleware/pre-auth/path-normalization";
import { methodEnforcement } from "../middleware/pre-auth/method-enforcement";
import { contentTypeCheck } from "../middleware/pre-auth/content-type-check";
import { headerValidation } from "../middleware/pre-auth/header-validation";
import { ipCheck } from "../middleware/pre-auth/ip-check";
import { rateLimit } from "../middleware/pre-auth/rate-limit";
import { anomalyDetection } from "../middleware/pre-auth/anomaly_detection";
import { basicUserAgentCheck } from "../middleware/pre-auth/user-agent-check";

import { geoIpCheck } from "../middleware/advanced/geoip/geoip-check";
import { sqliCheck } from "../middleware/advanced/sqli/sqli-check";
import { xssCheck } from "../middleware/advanced/xxs/xss-check";
import { lfiCheck } from "../middleware/advanced/lfi/lfi-check";
import { rfiCheck } from "../middleware/advanced/rfi/rfi-check";
import { pathCheck } from "../middleware/advanced/path/path-check";

import { GeoIpProvider } from "../middleware/advanced/geoip/geoip-provider";
import { SqlInjectionDetector } from "../middleware/advanced/sqli/sqli-detector";
import { XssDetector } from "../middleware/advanced/xxs/xss-detector";
import { LfiDetector } from "../middleware/advanced/lfi/lfi-detector";
import { RfiDetector } from "../middleware/advanced/rfi/rfi-detector";
import { PathTraversalDetector } from "../middleware/advanced/path/path-detector";

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
