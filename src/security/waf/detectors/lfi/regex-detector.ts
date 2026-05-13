import { LfiDetector } from "../../../../middleware/advanced/lfi/lfi-detector";

export class RegexLfiDetector implements LfiDetector {
  private patterns: RegExp[] = [
    /\.\.\//i, // ../
    /\.\.\\/i, // ..\
    /%2e%2e%2f/i, // ../ encodé
    /%2e%2e%5c/i, // ..\ encodé
    /\/etc\/passwd/i, // Linux sensitive file
    /\/proc\/self\/environ/i, // Linux env leak
    /win\.ini/i, // Windows sensitive file
    /system32/i, // Windows system folder
    /php:\/\//i, // php:// wrapper
    /file:\/\//i, // file:// wrapper
    /expect:\/\//i, // expect:// command execution
    /input:\/\//i, // input:// wrapper
    /data:\/\//i, // data:// wrapper
    /filter:\/\//i, // php://filter
    /base64/i, // base64 obfuscation
    /%c0%af/i, // unicode slash
    /%c1%9c/i, // unicode backslash
    /(\.\.){2,}/i, // .... or more
  ];

  detect(input: string): boolean {
    if (!input) return false;

    return this.patterns.some((regex) => regex.test(input));
  }
}
