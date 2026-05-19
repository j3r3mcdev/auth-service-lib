import { XssDetector } from "../xss-detector";
import { XSS_PATTERNS } from "../patterns/xss-patterns";

export class BasicXssDetector implements XssDetector {
  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();

    return XSS_PATTERNS.some((pattern) => lower.includes(pattern));
  }
}
