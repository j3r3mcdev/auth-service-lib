import { sqliCheck } from "../middleware/advanced/sqli/sqli-check";
import { BasicSqlInjectionDetector } from "../middleware/advanced/sqli/detectors/basic-sqli-detector";

import { xssCheck } from "../middleware/advanced/xxs/xss-check";
import { BasicXssDetector } from "../middleware/advanced/xxs/detectors/basic-xss-detector";

import { pathCheck } from "../middleware/advanced/path/path-check";
import { BasicPathTraversalDetector } from "../middleware/advanced/path/detectors/basic-path-detector";

import { lfiCheck } from "../middleware/advanced/lfi/lfi-check";
import { BasicLfiDetector } from "../middleware/advanced/lfi/detectors/basic-lfi-detector";

import { rfiCheck } from "../middleware/advanced/rfi/rfi-check";
import { BasicRfiDetector } from "../middleware/advanced/rfi/detectors/basic-rfi-detector";

import { userAgentCheck } from "../middleware/advanced/user-agent-filtering/user-agent-filtering-check";
import { BasicUserAgentDetector } from "../middleware/advanced/user-agent-filtering/detectors/basic-user-agent-detector";

import { geoIpCheck } from "../middleware/advanced/geoip/geoip-check";
import { MockGeoIpProvider } from "../middleware/advanced/geoip/provider/mock-provider";
import { GeoIpProvider } from "../middleware/advanced/geoip/geoip-provider";

export interface WafOptions {
  sqli?: boolean;
  xss?: boolean;
  path?: boolean;
  lfi?: boolean;
  rfi?: boolean;
  userAgent?: boolean;

  geoip?: boolean;
  blockedCountries?: string[];
  geoIpProvider?: GeoIpProvider;
}

const defaultWafOptions = {
  sqli: true,
  xss: true,
  path: true,
  lfi: true,
  rfi: true,
  userAgent: true,
  geoip: false,
  blockedCountries: [],
};

export function waf(options: WafOptions = {}) {
  const enabled = { ...defaultWafOptions, ...options };

  const chain = [];

  if (enabled.sqli) chain.push(sqliCheck(new BasicSqlInjectionDetector()));
  if (enabled.xss) chain.push(xssCheck(new BasicXssDetector()));
  if (enabled.path) chain.push(pathCheck(new BasicPathTraversalDetector()));
  if (enabled.lfi) chain.push(lfiCheck(new BasicLfiDetector()));
  if (enabled.rfi) chain.push(rfiCheck(new BasicRfiDetector()));
  if (enabled.userAgent)
    chain.push(userAgentCheck(new BasicUserAgentDetector()));

  if (enabled.geoip) {
    const provider = options.geoIpProvider ?? new MockGeoIpProvider();
    chain.push(geoIpCheck(provider, enabled.blockedCountries));
  }

  return chain;
}
