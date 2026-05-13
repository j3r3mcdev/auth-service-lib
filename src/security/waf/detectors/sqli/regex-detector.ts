import { SqlInjectionDetector } from "../sqli-detector";

export class BasicSqlInjectionDetector implements SqlInjectionDetector {
  private patterns: string[] = [
    " or 1=1",
    "' or '1'='1",
    "--",
    ";--",
    "/*",
    "*/",
    "union select",
    "drop table",
    "insert into",
    "xp_",
  ];

  detect(input: string): boolean {
    if (!input) return false;

    const lower = input.toLowerCase();

    return this.patterns.some((p) => lower.includes(p));
  }
}
