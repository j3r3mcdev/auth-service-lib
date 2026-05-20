import { MlXssProvider } from "../providers/ml-xss-provider";

describe("MlXssProvider", () => {
  it("retourne le score du modèle (normalisé)", () => {
    const provider = new MlXssProvider(
      50,
      (input) => 120, // score trop haut → doit être normalisé à 100
    );

    const score = provider.score("<script>");
    expect(score).toBe(100);
  });

  it("retourne un score normalisé minimum (0)", () => {
    const provider = new MlXssProvider(
      50,
      (input) => -50, // score trop bas → doit être normalisé à 0
    );

    const score = provider.score("hello");
    expect(score).toBe(0);
  });

  it("retourne 0 si le modèle lance une erreur", () => {
    const provider = new MlXssProvider(50, () => {
      throw new Error("Model failure");
    });

    const score = provider.score("<script>");
    expect(score).toBe(0);
  });

  it("utilise bien la fonction modelPredictSync", () => {
    const mockFn = jest.fn().mockReturnValue(42);

    const provider = new MlXssProvider(50, mockFn);

    const score = provider.score("test");

    expect(mockFn).toHaveBeenCalledWith("test");
    expect(score).toBe(42);
  });
});
