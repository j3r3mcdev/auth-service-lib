import { LfiDetector } from "../../../../middleware/advanced/lfi/lfi-detector";

export class BasicLfiDetector implements LfiDetector {
  private patterns: string[] = [
    "../",
    "..\\",
    "/etc/passwd",
    "/proc/self/environ",
    "windows/win.ini",
    "c:\\windows\\win.ini",
    "php://",
    "file://",
    "expect://",
    "input://",
    "data://",
  ];

  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();

    return this.patterns.some((p) => lower.includes(p));
  }
}
