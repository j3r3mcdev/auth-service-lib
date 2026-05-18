import { UserAgentDetector } from "../user-agent-detector";

export class MockUserAgentDetector implements UserAgentDetector {
  constructor(private map: Record<string, boolean>) {}

  isMalicious(ua: string): boolean {
    if (!ua) return false;
    return this.map[ua] ?? false;
  }
}
