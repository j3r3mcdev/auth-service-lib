import { SqlInjectionDetector } from "../../../../middleware/advanced/sqli/sqli-detector";

export class RegexSqlInjectionDetector implements SqlInjectionDetector {
  private patterns: RegExp[] = [
    /(\bunion\b\s+\bselect\b)/i,
    /(\bdrop\b\s+\btable\b)/i,
    /(\binsert\b\s+\binto\b)/i,
    /(\bupdate\b\s+\bset\b)/i,
    /(\bdelete\b\s+\bfrom\b)/i,
    /(--|#)/, // commentaires SQL
    /\/\*.*?\*\//s, // commentaires multi-lignes
    /(\bor\b\s+1=1)/i,
    /(\bexec\b\s+\bxp_)/i,
    /(['"]\s*or\s*['"])/i,
  ];

  detect(input: string): boolean {
    if (!input) return false;

    return this.patterns.some((regex) => regex.test(input));
  }
}
