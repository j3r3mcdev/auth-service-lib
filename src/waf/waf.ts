import { RegexSqlInjectionDetector } from "../middleware/advanced/sqli/detectors/regex-sqli-detector";
import { BasicSqlInjectionDetector } from "../middleware/advanced/sqli/detectors/basic-sqli-detector";
import { sqliCheck } from "../middleware/advanced/sqli/sqli-check";

import { HeuristicXssProvider } from "../middleware/advanced/xxs/providers/heuristic-xss-provider";
import { XssDetector } from "../middleware/advanced/xxs/xss-detector";
import { AdvancedXssDetector } from "../middleware/advanced/xxs/detectors/advanced-xss-detector";
import { xssCheck } from "../middleware/advanced/xxs/xss-check";
import { MlXssProvider } from "../middleware/advanced/xxs/providers/ml-xss-provider";

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

import { botCheck } from "../middleware/advanced/bot/bot-check";
import { MockBotDetector } from "../middleware/advanced/bot/detectors/mock-bot-detector";

// ---------------------------------------------------------
// OPTIONS DU WAF
// ---------------------------------------------------------

export interface WafOptions {
  sqli?: boolean;

  xss?: boolean;
  xssDetector?: XssDetector;

  path?: boolean;
  lfi?: boolean;
  rfi?: boolean;

  userAgent?: boolean;

  bot?: boolean;

  geoip?: boolean;
  geoIpProvider?: GeoIpProvider;
  blockedCountries?: string[];
}

export const defaultWafOptions: Required<
  Omit<WafOptions, "xssDetector" | "geoIpProvider" | "blockedCountries">
> & {
  xssDetector: XssDetector;
  geoIpProvider: GeoIpProvider;
  blockedCountries: string[];
} = {
  sqli: true,

  xss: true,
  xssDetector: new AdvancedXssDetector(
    new MlXssProvider(50, (input) => (input.includes("<script>") ? 90 : 10)),
  ),

  path: true,
  lfi: true,
  rfi: true,

  userAgent: true,

  bot: false,

  geoip: false,
  geoIpProvider: new MockGeoIpProvider(),
  blockedCountries: [],
};

// ---------------------------------------------------------
// PIPELINE DU WAF
// ---------------------------------------------------------

export function waf(options: WafOptions = {}) {
  const enabled = { ...defaultWafOptions, ...options };

  const chain = [];

  // SQL Injection
  if (enabled.sqli) {
    chain.push(sqliCheck(new BasicSqlInjectionDetector()));
  }

  // XSS
  const xssDetector = options.xssDetector ?? enabled.xssDetector;
  if (enabled.xss) {
    chain.push(xssCheck(xssDetector));
  }

  // Path Traversal
  if (enabled.path) {
    chain.push(pathCheck(new BasicPathTraversalDetector()));
  }

  // LFI
  if (enabled.lfi) {
    chain.push(lfiCheck(new BasicLfiDetector()));
  }

  // RFI
  if (enabled.rfi) {
    chain.push(rfiCheck(new BasicRfiDetector()));
  }

  // User-Agent filtering
  if (enabled.userAgent) {
    chain.push(userAgentCheck(new BasicUserAgentDetector()));
  }

  // Bot detection
  if (enabled.bot) {
    chain.push(botCheck(new MockBotDetector(false)));
  }

  // GeoIP filtering
  if (enabled.geoip) {
    const provider = options.geoIpProvider ?? enabled.geoIpProvider;
    const blocked = options.blockedCountries ?? enabled.blockedCountries;
    chain.push(geoIpCheck(provider, blocked));
  }

  return chain;
}
