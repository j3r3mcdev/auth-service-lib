import { SqliProvider } from "./sqli-provider";

export class MlSqliProvider implements SqliProvider {
  constructor(
    private threshold: number,
    private model: (input: string) => number,
  ) {}

  evaluate(input: string): number {
    try {
      return this.model(input);
    } catch {
      return 0;
    }
  }
}
