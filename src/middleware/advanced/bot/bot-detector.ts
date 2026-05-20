export interface BotDetector {
  isBot(userAgent: string): boolean;
}
