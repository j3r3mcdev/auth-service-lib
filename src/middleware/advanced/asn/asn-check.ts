import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { AsnProvider } from "./asn-provider";

export function asnCheck(provider: AsnProvider, blockedAsn: number[] = []) {
  return function (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) {
    const ip = req.ip || "";

    const asn = provider.lookup(ip);

    if (asn === null) {
      return res.status(400).json({
        error: "Unable to determine ASN for IP",
      });
    }

    if (blockedAsn.includes(asn)) {
      return res.status(403).json({
        error: `Access forbidden for ASN: ${asn}`,
      });
    }

    next();
  };
}
