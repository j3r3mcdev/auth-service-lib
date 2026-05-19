import { SQLI_PATTERNS } from "../patterns/sqli-patterns";
import { SqlInjectionDetector } from "../sqli-detector";

export class BasicSqlInjectionDetector implements SqlInjectionDetector {
  detect(value: string): boolean {
    if (!value) return false;

    const lower = value.toLowerCase();

    return SQLI_PATTERNS.some((pattern) => lower.includes(pattern));
  }
}
