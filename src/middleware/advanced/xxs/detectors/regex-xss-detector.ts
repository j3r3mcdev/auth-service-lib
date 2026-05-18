import { XssDetector } from "../xss-detector";

export class RegexXssDetector implements XssDetector {
  private patterns: RegExp[] = [
    // <script> tags
    /<script[\s\S]*?>[\s\S]*?<\/script>/i,
    /<script[\s\S]*?>/i,

    // HTML tags commonly used for XSS
    /<img[\s\S]*?>/i,
    /<svg[\s\S]*?>/i,
    /<iframe[\s\S]*?>/i,
    /<object[\s\S]*?>/i,
    /<embed[\s\S]*?>/i,
    /<link[\s\S]*?>/i,
    /<meta[\s\S]*?>/i,

    // Event handlers (onerror, onclick, etc.)
    /on\w+=/i,

    // Dangerous protocols
    /javascript:/i,
    /vbscript:/i,
    /data:text\/html/i,

    // Encoded XSS
    /%3Cscript/i,
    /%3Cimg/i,
    /&#x3c;script/i,
    /&lt;script/i,

    // Payloads
    /alert\s*\(/i,
    /prompt\s*\(/i,
    /confirm\s*\(/i,

    // DOM-based XSS
    /document\.cookie/i,
    /document\.write/i,
    /window\.location/i,
    /eval\s*\(/i,
    /setTimeout\s*\(/i,
    /setInterval\s*\(/i,
  ];

  detect(input: string): boolean {
    if (!input) return false;

    return this.patterns.some((regex) => regex.test(input));
  }
}
