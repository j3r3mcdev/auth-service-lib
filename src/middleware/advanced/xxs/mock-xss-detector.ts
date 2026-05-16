import { XssDetector } from "./xss-detector";

export class MockXssDetector implements XssDetector {
  constructor(private patterns: Record<string, boolean> = {}) {}

  detect(input: string): boolean {
    return this.patterns[input] ?? false;
  }
}
