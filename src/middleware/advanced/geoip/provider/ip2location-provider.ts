import { GeoIpProvider } from "../geoip-provider";

export class IP2LocationProvider implements GeoIpProvider {
  constructor(private db: any) {}

  lookup(ip: string): string | null {
    try {
      const result = this.db.getAll(ip);
      return result?.countryShort || null;
    } catch {
      return null;
    }
  }
}
