import { AdvancedSqliDetector } from "../detectors/advanced-sqli-detector";
import { SqliProvider } from "../providers/sqli-provider";

describe("AdvancedSqliDetector", () => {
  it("détecte quand le score ML dépasse le threshold", () => {
    const provider: SqliProvider = {
      evaluate: jest.fn(() => 80),
    };

    const detector = new AdvancedSqliDetector(provider, 50);

    expect(detector.detect("UNION SELECT")).toBe(true);
    expect(provider.evaluate).toHaveBeenCalledWith("UNION SELECT");
  });

  it("ne détecte pas quand le score ML est trop faible", () => {
    const provider: SqliProvider = {
      evaluate: jest.fn(() => 20),
    };

    const detector = new AdvancedSqliDetector(provider, 50);

    expect(detector.detect("hello")).toBe(false);
  });
});
