import { PathTraversalDetector } from "../../../../middleware/advanced/path/path-detector";

export class BasicPathTraversalDetector implements PathTraversalDetector {
  private patterns: string[] = [
    "../",
    "..\\",
    "%2e%2e%2f", // ../ encodé
    "%2e%2e\\", // ..\ encodé
    "%2e%2e%5c", // ..\ encodé (hex)
    "%2e%2e%2f", // ../ encodé (hex)
    "..%2f",
    "..%5c",
  ];

  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();

    return this.patterns.some((p) => lower.includes(p));
  }
}
