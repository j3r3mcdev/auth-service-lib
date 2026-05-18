import { RfiDetector } from "../rfi-detector";

const RFI_PATTERNS = [
  "http://",
  "https://",
  "ftp://",
  "ftps://",
  "php://",
  "php://input",
  "data://",
  "expect://",
  "file://",
];

export class BasicRfiDetector implements RfiDetector {
  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();

    return RFI_PATTERNS.some((pattern) => lower.includes(pattern));
  }
}
