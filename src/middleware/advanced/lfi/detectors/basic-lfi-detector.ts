import { LfiDetector } from "../lfi-detector";

const LFI_PATTERNS = [
  "../",
  "..\\",
  "/etc/passwd",
  "/etc/shadow",
  "c:\\windows\\system32",
  "c:/windows/system32",
  "%2e%2e%2f", // ../ encodé
  "%2e%2e\\", // ..\ encodé
];

export class BasicLfiDetector implements LfiDetector {
  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();
    return LFI_PATTERNS.some((pattern) => lower.includes(pattern));
  }
}
