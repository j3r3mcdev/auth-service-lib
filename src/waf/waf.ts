import {
  sqliCheck,
  xssCheck,
  pathCheck,
  lfiCheck,
  rfiCheck,
  userAgentCheck,
} from "../middleware/advanced";

import {
  BasicSqlInjectionDetector,
  BasicXssDetector,
  BasicPathTraversalDetector,
  BasicLfiDetector,
  BasicRfiDetector,
  BasicUserAgentDetector,
} from "../detectors";

export interface WafOptions {
  sqli?: boolean;
  xss?: boolean;
  path?: boolean;
  lfi?: boolean;
  rfi?: boolean;
  userAgent?: boolean;
}

export function waf(options: WafOptions = {}) {
  const enabled = {
    sqli: options.sqli ?? true,
    xss: options.xss ?? true,
    path: options.path ?? true,
    lfi: options.lfi ?? true,
    rfi: options.rfi ?? true,
    userAgent: options.userAgent ?? true,
  };

  const chain = [];

  if (enabled.sqli) chain.push(sqliCheck(new BasicSqlInjectionDetector()));
  if (enabled.xss) chain.push(xssCheck(new BasicXssDetector()));
  if (enabled.path) chain.push(pathCheck(new BasicPathTraversalDetector()));
  if (enabled.lfi) chain.push(lfiCheck(new BasicLfiDetector()));
  if (enabled.rfi) chain.push(rfiCheck(new BasicRfiDetector()));
  if (enabled.userAgent)
    chain.push(userAgentCheck(new BasicUserAgentDetector()));

  return chain;
}
