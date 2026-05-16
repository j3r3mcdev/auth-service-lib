import { SqlInjectionDetector } from "./sqli-detector";

export class MockSqlInjectionDetector implements SqlInjectionDetector {
  constructor(private patterns: Record<string, boolean> = {}) {}

  detect(input: string): boolean {
    return this.patterns[input] ?? false;
  }
}
