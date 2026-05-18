import { GeoIpProvider } from "../geoip-provider";

export class MockGeoIpProvider implements GeoIpProvider {
  constructor(private map: Record<string, string | null> = {}) {}

  lookup(ip: string): string | null {
    return this.map[ip] ?? null;
  }
}
