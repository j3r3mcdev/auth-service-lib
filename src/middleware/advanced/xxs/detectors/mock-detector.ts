import { XssDetector } from "../xss-detector";

export class MockXssDetector implements XssDetector {
  constructor(private map: Record<string, boolean>) {}

  detect(input: string): boolean {
    return this.map[input] ?? false;
  }
}
