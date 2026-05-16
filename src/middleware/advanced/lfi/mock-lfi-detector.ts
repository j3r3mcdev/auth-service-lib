import { LfiDetector } from "./lfi-detector";

export class MockLfiDetector implements LfiDetector {
  constructor(private patterns: Record<string, boolean> = {}) {}

  detect(input: string): boolean {
    return this.patterns[input] ?? false;
  }
}
