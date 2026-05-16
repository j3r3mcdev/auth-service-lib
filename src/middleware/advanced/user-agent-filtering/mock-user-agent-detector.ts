import { UserAgentDetector } from "./user-agent-detector";

export class MockUserAgentDetector implements UserAgentDetector {
  constructor(private patterns: Record<string, boolean> = {}) {}

  detect(input: string): boolean {
    return this.patterns[input] ?? false;
  }
}
