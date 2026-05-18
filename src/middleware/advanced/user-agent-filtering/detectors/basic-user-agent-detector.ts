import { UserAgentDetector } from "../user-agent-detector";

const BLOCKED = ["curl", "wget", "python", "bot", "crawler"];

export class BasicUserAgentDetector implements UserAgentDetector {
  detect(ua: string | undefined): boolean {
    if (!ua) return false;
    const lower = ua.toLowerCase();
    return BLOCKED.some((p) => lower.includes(p));
  }
}
