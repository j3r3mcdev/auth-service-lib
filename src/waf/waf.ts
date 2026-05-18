import { sqliCheck } from "../middleware/advanced/sqli/sqli-check";
import { BasicSqlInjectionDetector } from "../middleware/advanced/sqli/detectors/basic-sqli-detector";

import { xssCheck } from "../middleware/advanced/xxs/xss-check";
import { BasicXssDetector } from "../middleware/advanced/xxs/detectors/basic-xss-detector";

import { pathCheck } from "../middleware/advanced/path/path-check";
import { lfiCheck } from "../middleware/advanced/lfi/lfi-check";
import { rfiCheck } from "../middleware/advanced/rfi/rfi-check";
import { userAgentFilteringCheck } from "../middleware/advanced/user-agent-filtering/user-agent-filtering-check";

export interface WafOptions {
  sqli?: boolean;
  xss?: boolean;
  path?: boolean;
  lfi?: boolean;
  rfi?: boolean;
  userAgent?: boolean;
}

const defaultWafOptions: Required<WafOptions> = {
  sqli: true,
  xss: true,
  path: true,
  lfi: true,
  rfi: true,
  userAgent: true,
};

export function waf(options: WafOptions = {}) {
  const enabled = { ...defaultWafOptions, ...options };

  const chain = [];

  // SQL Injection (complet)
  if (enabled.sqli) chain.push(sqliCheck(new BasicSqlInjectionDetector()));

  // XSS (complet)
  if (enabled.xss) chain.push(xssCheck(new BasicXssDetector()));

  // Path Traversal (middleware seulement)
  if (enabled.path) chain.push(pathCheck);

  // LFI (middleware seulement)
  if (enabled.lfi) chain.push(lfiCheck);

  // RFI (middleware seulement)
  if (enabled.rfi) chain.push(rfiCheck);

  // User-Agent Filtering (middleware seulement)
  if (enabled.userAgent) chain.push(userAgentFilteringCheck);

  return chain;
}
