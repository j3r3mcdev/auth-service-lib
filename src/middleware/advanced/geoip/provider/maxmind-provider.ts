import { GeoIpProvider } from "../geoip-provider";

export class MaxMindProvider implements GeoIpProvider {
  constructor(private reader: any) {}

  lookup(ip: string): string | null {
    const result = this.reader.get(ip);
    return result?.country?.iso_code || null;
  }
}
