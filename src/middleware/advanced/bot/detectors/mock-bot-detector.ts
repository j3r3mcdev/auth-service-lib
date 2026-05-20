import { BotDetector } from "../bot-detector";

export class MockBotDetector implements BotDetector {
  constructor(private result: boolean = false) {}

  isBot(userAgent: string): boolean {
    return this.result;
  }
}
