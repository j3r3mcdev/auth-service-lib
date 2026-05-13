import { XssDetector } from "../xss-detector";

export class RegexXssDetector implements XssDetector {
  private patterns: RegExp[] = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/i,
    /<script[\s\S]*?>/i,
    /javascript:/i,
    /on\w+=/i, // onerror, onload, onclick, etc.
    /<img[\s\S]*?>/i,
    /<iframe[\s\S]*?>/i,
    /<svg[\s\S]*?>/i,
    /<object[\s\S]*?>/i,
    /<embed[\s\S]*?>/i,
    /<link[\s\S]*?>/i,
    /<meta[\s\S]*?>/i,
    /document\.cookie/i,
    /document\.write/i,
    /window\.location/i,
    /eval\(/i,
    /setTimeout\(/i,
    /setInterval\(/i,
  ];

  detect(input: string): boolean {
    if (!input) return false;

    return this.patterns.some((regex) => regex.test(input));
  }
}
