import { RfiDetector } from "../../../../middleware/advanced/rfi/rfi-detector";

export class MockRfiDetector implements RfiDetector {
  constructor(private map: Record<string, boolean>) {}

  detect(input: string): boolean {
    return this.map[input] ?? false;
  }
}
