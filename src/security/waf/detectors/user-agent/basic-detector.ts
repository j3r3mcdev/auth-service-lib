import { UserAgentDetector } from "../user-agent-detector";

export class BasicUserAgentDetector implements UserAgentDetector {
  private blacklist: string[] = [
    "curl",
    "wget",
    "python-requests",
    "libwww-perl",
    "scrapy",
    "httpclient",
    "sqlmap",
    "nmap",
    "nikto",
    "fuzzer",
  ];

  detect(ua: string): boolean {
    if (!ua) return false;

    const lower = ua.toLowerCase();

    return this.blacklist.some((bad) => lower.includes(bad));
  }
}
