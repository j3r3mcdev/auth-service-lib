import { LfiDetector } from "../lfi-detector";

export class MockLfiDetector implements LfiDetector {
  constructor(private map: Record<string, boolean>) {}

  detect(input: string): boolean {
    return this.map[input] ?? false;
  }
}
