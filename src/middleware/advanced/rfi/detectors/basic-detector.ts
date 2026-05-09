import { RfiDetector } from "../rfi-detector";

export class BasicRfiDetector implements RfiDetector {
  private patterns: string[] = [
    "http://",
    "https://",
    "ftp://",
    "ftps://",
    "php://",
    "file://",
    "data://",
    "expect://",
    "input://",
  ];

  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();

    return this.patterns.some((p) => lower.includes(p));
  }
}
