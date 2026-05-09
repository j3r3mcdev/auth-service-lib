import { AsnProvider } from "../asn-provider";

export class MaxMindAsnProvider implements AsnProvider {
  constructor(private reader: any) {}

  lookup(ip: string): number | null {
    try {
      const result = this.reader.get(ip);
      return result?.autonomous_system_number || null;
    } catch {
      return null;
    }
  }
}
