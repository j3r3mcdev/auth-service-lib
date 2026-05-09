import {
  MiddlewareRequest,
  MiddlewareResponse,
  MiddlewareNext,
} from "../../middleware-types";
import { GeoIpProvider } from "./geoip-provider";

export function geoIpCheck(
  provider: GeoIpProvider,
  blockedCountries: string[] = [],
) {
  return function (
    req: MiddlewareRequest,
    res: MiddlewareResponse,
    next: MiddlewareNext,
  ) {
    const ip = req.ip || "";

    const country = provider.lookup(ip);

    if (!country) {
      return res.status(400).json({
        error: "Unable to determine country for IP",
      });
    }

    if (blockedCountries.includes(country)) {
      return res.status(403).json({
        error: `Access forbidden from country: ${country}`,
      });
    }

    next();
  };
}
