import { PathTraversalDetector } from "../path-detector";

export class MockPathTraversalDetector implements PathTraversalDetector {
  constructor(private map: Record<string, boolean>) {}

  detect(input: string): boolean {
    return this.map[input] ?? false;
  }
}
