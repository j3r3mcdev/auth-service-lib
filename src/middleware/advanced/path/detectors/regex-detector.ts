import { PathTraversalDetector } from "../path-detector";

export class RegexPathTraversalDetector implements PathTraversalDetector {
  private patterns: RegExp[] = [
    /\.\.\//i, // ../
    /\.\.\\/i, // ..\
    /%2e%2e%2f/i, // ../ encodé
    /%2e%2e%5c/i, // ..\ encodé
    /%c0%af/i, // / encodé unicode
    /%c1%9c/i, // \ encodé unicode
    /\.\.%2f/i, // ..%2f
    /\.\.%5c/i, // ..%5c
    /(\.\.){2,}/i, // .... or more
    /\/\.\.\//i, // /../
    /\\\.\.\\/i, // \..\
    /\.\.\/\.\.\//i, // ../../
    /%2e/i, // . encodé
  ];

  detect(input: string): boolean {
    if (!input) return false;

    return this.patterns.some((regex) => regex.test(input));
  }
}
