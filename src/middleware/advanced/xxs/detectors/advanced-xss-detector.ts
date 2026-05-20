import { XssDetector } from "../xss-detector";
import { XssProvider } from "../providers/xss-provider";

export class AdvancedXssDetector implements XssDetector {
  constructor(
    private provider: XssProvider,
    private defaultThreshold: number = 50,
  ) {}

  detect(input: string): boolean {
    const score = this.provider.score(input);
    const threshold = this.provider.threshold ?? this.defaultThreshold;

    return score >= threshold;
  }
}
