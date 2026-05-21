import { SqliProvider } from "../providers/sqli-provider";
import { SqlInjectionDetector } from "../sqli-detector";

export class AdvancedSqliDetector implements SqlInjectionDetector {
  constructor(
    private provider: SqliProvider,
    private threshold: number = 50,
  ) {}

  detect(input: string): boolean {
    const score = this.provider.evaluate(input);
    return score >= this.threshold;
  }
}
