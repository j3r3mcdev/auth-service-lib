import { UserAgentDetector } from "../user-agent-detector";

export class RegexUserAgentDetector implements UserAgentDetector {
  private patterns: RegExp[] = [
    /curl\/\d+/i,
    /wget\/\d+/i,
    /python-requests/i,
    /python-urllib/i,
    /aiohttp/i,
    /libwww-perl/i,
    /perl/i,
    /php\/\d+/i,
    /java\/\d+/i,
    /go-http-client/i,
    /httpclient/i,
    /okhttp/i,
    /sqlmap/i,
    /nmap/i,
    /nikto/i,
    /masscan/i,
    /fuzzer/i,
    /dirbuster/i,
    /crawler/i,
    /spider/i,
    /bot\b/i, // bot en fin de mot
  ];

  detect(ua: string): boolean {
    if (!ua) return false;

    return this.patterns.some((regex) => regex.test(ua));
  }
}
