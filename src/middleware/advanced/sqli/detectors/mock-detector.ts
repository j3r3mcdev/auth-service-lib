import { SqlInjectionDetector } from "../sqli-detector";

export class MockSqlInjectionDetector implements SqlInjectionDetector {
  constructor(private map: Record<string, boolean>) {}

  detect(input: string): boolean {
    return this.map[input] ?? false;
  }
}
