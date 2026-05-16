import { PathTraversalDetector } from "./path-detector";

export class MockPathDetector implements PathTraversalDetector {
  constructor(private patterns: Record<string, boolean> = {}) {}

  detect(input: string): boolean {
    return this.patterns[input] ?? false;
  }
}
