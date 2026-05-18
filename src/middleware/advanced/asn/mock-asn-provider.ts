import { AsnProvider } from "./asn-provider";

export class MockAsnProvider implements AsnProvider {
  constructor(private map: Record<string, number | null> = {}) {}

  lookup(ip: string): number | null {
    return this.map[ip] ?? null;
  }
}
