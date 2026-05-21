import { MlSqliProvider } from "../providers/ml-sqli-provider";

describe("ML SQLi Provider", () => {
  it("retourne le score du modèle ML", () => {
    const mockModel = jest.fn(() => 80);
    const provider = new MlSqliProvider(50, mockModel);

    const score = provider.evaluate("SELECT * FROM users");

    expect(score).toBe(80);
    expect(mockModel).toHaveBeenCalledWith("SELECT * FROM users");
  });

  it("retourne 0 si le modèle plante", () => {
    const mockModel = jest.fn(() => {
      throw new Error("fail");
    });

    const provider = new MlSqliProvider(50, mockModel);

    const score = provider.evaluate("DROP TABLE");

    expect(score).toBe(0);
  });
});
