import { sqliCheck } from "../middleware/advanced/sqli/sqli-check";
import { BasicSqlInjectionDetector } from "../middleware/advanced/sqli/detectors/basic-sqli-detector";

import { xssCheck } from "../middleware/advanced/xxs/xss-check";
import { BasicXssDetector } from "../middleware/advanced/xxs/detectors/basic-xss-detector";

import { pathCheck } from "../middleware/advanced/path/path-check";

import { lfiCheck } from "../middleware/advanced/lfi/lfi-check";
import { BasicLfiDetector } from "../middleware/advanced/lfi/detectors/basic-lfi-detector";

import { rfiCheck } from "../middleware/advanced/rfi/rfi-check";
import { BasicRfiDetector } from "../middleware/advanced/rfi/detectors/basic-rfi-detector";

import { userAgentFilteringCheck } from "../middleware/advanced/user-agent-filtering/user-agent-filtering-check";
import { BasicUserAgentDetector } from "../middleware/advanced/user-agent-filtering/detectors/basic-user-agent-detector";

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

  if (enabled.sqli) chain.push(sqliCheck(new BasicSqlInjectionDetector()));
  if (enabled.xss) chain.push(xssCheck(new BasicXssDetector()));
  if (enabled.path) chain.push(pathCheck);
  if (enabled.lfi) chain.push(lfiCheck(new BasicLfiDetector()));
  if (enabled.rfi) chain.push(rfiCheck(new BasicRfiDetector()));
  if (enabled.userAgent)
    chain.push(userAgentFilteringCheck(new BasicUserAgentDetector()));

  return chain;
}
