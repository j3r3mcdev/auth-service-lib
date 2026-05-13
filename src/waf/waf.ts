import { sqliCheck } from "../middleware/advanced/sqli/sqli-check";
import { xssCheck } from "../middleware/advanced/xxs/xss-check";
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

  if (enabled.sqli) chain.push(sqliCheck);
  if (enabled.xss) chain.push(xssCheck);
  if (enabled.path) chain.push(pathCheck);
  if (enabled.lfi) chain.push(lfiCheck);
  if (enabled.rfi) chain.push(rfiCheck);
  if (enabled.userAgent) chain.push(userAgentFilteringCheck);

  return chain;
}
