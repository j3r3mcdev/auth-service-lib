import { AsnProvider } from "../asn-provider";

export class IP2LocationAsnProvider implements AsnProvider {
  constructor(private db: any) {}

  lookup(ip: string): number | null {
    try {
      const result = this.db.getAll(ip);
      return result?.asn || null;
    } catch {
      return null;
    }
  }
}
