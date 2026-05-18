import { UserAgentDetector } from "../user-agent-detector";

export class MockUserAgentDetector implements UserAgentDetector {
  constructor(private map: Record<string, boolean>) {}

  detect(ua: string | undefined): boolean {
    if (!ua) return false;
    return this.map[ua] ?? false;
  }
}
