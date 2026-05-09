export interface GeoIpProvider {
  lookup(ip: string): string | null; // retourne un code pays ISO (ex: "FR")
}
