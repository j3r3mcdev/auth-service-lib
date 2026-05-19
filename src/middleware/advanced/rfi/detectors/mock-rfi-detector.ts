import { RfiDetector } from "../rfi-detector";

export class MockRfiDetector implements RfiDetector {
  constructor(private patterns: Record<string, boolean> = {}) {}

  detect(input: string): boolean {
    return this.patterns[input] ?? false;
  }
}
