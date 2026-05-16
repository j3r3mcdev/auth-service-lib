import { SQLI_PATTERNS } from "../patterns/sqli-patterns";

export class RegexSqlInjectionDetector {
  private readonly regex: RegExp;

  constructor() {
    const pattern = SQLI_PATTERNS.map(escapeRegexLite).join("|");

    this.regex = new RegExp(pattern, "i");
  }

  detect(value: string): boolean {
    if (!value) return false;

    const normalized = normalize(value);

    return this.regex.test(normalized);
  }
}
function escapeRegexLite(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

// -----------------------------
// Normalisation avancée
// -----------------------------
function normalize(input: string): string {
  if (!input) return "";

  let value = input;

  // 1. URL decode (simple)
  try {
    value = decodeURIComponent(value);
  } catch {}

  // 2. URL decode (double)
  try {
    value = decodeURIComponent(value);
  } catch {}

  // 3. Remove multiple spaces/tabs/newlines
  value = value.replace(/\s+/g, " ");

  // 4. Remove invisible characters
  value = value.replace(/[\u0000-\u001F\u007F]+/g, "");

  // 5. Remove SQL comments
  value = value.replace(/\/\*.*?\*\//g, "");

  // 6. Reduce repeated special chars (----, ++++, ===, '''')
  value = value.replace(/([=+\-'])\1+/g, "$1");

  // 7. Lowercase
  return value.toLowerCase();
}

// -----------------------------
// Escape regex helper
// -----------------------------
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
