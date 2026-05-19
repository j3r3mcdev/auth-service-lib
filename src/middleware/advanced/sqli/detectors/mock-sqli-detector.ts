import { SqlInjectionDetector } from "../sqli-detector";

export class MockSqlInjectionDetector implements SqlInjectionDetector {
  constructor(private readonly result: boolean) {}

  detect(): boolean {
    return this.result;
  }
}
