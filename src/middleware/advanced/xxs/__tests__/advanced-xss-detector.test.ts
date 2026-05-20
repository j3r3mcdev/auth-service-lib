import { AdvancedXssDetector } from "../detectors/advanced-xss-detector";
import { XssProvider } from "../providers/xss-provider";

class MockProvider implements XssProvider {
  constructor(
    private mockScore: number,
    public threshold: number = 50,
  ) {}

  score(input: string): number {
    return this.mockScore;
  }
}

describe("AdvancedXssDetector", () => {
  it("retourne true quand le score dépasse le seuil", () => {
    const provider = new MockProvider(80, 50);
    const detector = new AdvancedXssDetector(provider);

    expect(detector.detect("<script>alert(1)</script>")).toBe(true);
  });

  it("retourne false quand le score est en dessous du seuil", () => {
    const provider = new MockProvider(20, 50);
    const detector = new AdvancedXssDetector(provider);

    expect(detector.detect("Bonjour le monde")).toBe(false);
  });

  it("utilise le seuil par défaut si le provider n'en fournit pas", () => {
    const provider = {
      score: () => 70, // score = 70
      threshold: undefined, // seuil par défaut = 70
    };

    const detector = new AdvancedXssDetector(provider, 70);

    // 70 >= 70 → true
    expect(detector.detect("<script>")).toBe(true);
  });

  it("retourne true si score == seuil", () => {
    const provider = new MockProvider(50, 50);
    const detector = new AdvancedXssDetector(provider);

    expect(detector.detect("<script>")).toBe(true);
  });
});
