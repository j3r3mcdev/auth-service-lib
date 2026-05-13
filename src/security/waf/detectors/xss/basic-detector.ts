import { XssDetector } from "../../../../middleware/advanced/xxs/xss-detector";

export class BasicXssDetector implements XssDetector {
  private patterns: string[] = [
    "<script",
    "</script",
    "javascript:",
    "onerror=",
    "onload=",
    "onmouseover=",
    "<img",
    "<iframe",
    "<svg",
    "<object",
  ];

  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();

    return this.patterns.some((p) => lower.includes(p));
  }
}
