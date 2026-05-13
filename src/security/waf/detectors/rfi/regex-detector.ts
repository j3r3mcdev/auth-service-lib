import { RfiDetector } from "../../../../middleware/advanced/rfi/rfi-detector";

export class RegexRfiDetector implements RfiDetector {
  private patterns: RegExp[] = [
    /^https?:\/\//i, // http:// ou https://
    /^ftps?:\/\//i, // ftp:// ou ftps://
    /php:\/\//i, // php:// wrapper
    /file:\/\//i, // file:// wrapper
    /data:\/\//i, // data:// wrapper
    /expect:\/\//i, // expect:// (dangerous)
    /input:\/\//i, // input://
    /filter:\/\//i, // php://filter
    /base64/i, // base64 obfuscation
    /%68%74%74%70/i, // "http" encodé en hex
    /%66%74%70/i, // "ftp" encodé en hex
    /hxxp:\/\//i, // obfuscation http -> hxxp
    /\/\/[a-z0-9\.-]+\.[a-z]{2,}/i, // URL générique
  ];

  detect(input: string): boolean {
    if (!input) return false;

    return this.patterns.some((regex) => regex.test(input));
  }
}
