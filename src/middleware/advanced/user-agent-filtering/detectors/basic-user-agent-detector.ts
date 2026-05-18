import { UserAgentDetector } from "../user-agent-detector";

export class BasicUserAgentDetector implements UserAgentDetector {
  private blacklist: string[];

  constructor(blacklist: string[] = ["curl", "wget", "python-requests"]) {
    this.blacklist = blacklist.map((s) => s.toLowerCase());
  }

  isMalicious(ua: string): boolean {
    if (!ua) return false;
    const lower = ua.toLowerCase();
    return this.blacklist.some((blocked) => lower.includes(blocked));
  }
}
