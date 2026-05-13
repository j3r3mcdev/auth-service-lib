import { basicUserAgentCheck } from "./user-agent-check";
import { ipCheck } from "./ip-check";
import { rateLimit } from "./rate-limit";
import { anomalyDetection } from "./anomaly_detection";
import { headerValidation } from "./header-validation";
import { contentTypeCheck } from "./content-type-check";
import { pathNormalization } from "./path-normalization";
import { methodEnforcement } from "./method-enforcement";

export const preAuthPipeline = [
  basicUserAgentCheck,
  ipCheck,
  rateLimit,
  headerValidation,
  anomalyDetection,
  contentTypeCheck,
  pathNormalization,
  methodEnforcement,
];
