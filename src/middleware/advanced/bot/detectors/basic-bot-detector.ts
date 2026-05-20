import { BotDetector } from "../bot-detector";

export class BasicBotDetector implements BotDetector {
  private patterns = [
    /bot/i,
    /crawler/i,
    /spider/i,
    /scraper/i,
    /curl/i,
    /wget/i,
    /python-requests/i,
    /axios/i,
  ];

  isBot(userAgent: string): boolean {
    if (!userAgent || userAgent.length < 10) return true;

    return this.patterns.some((p) => p.test(userAgent));
  }
}
