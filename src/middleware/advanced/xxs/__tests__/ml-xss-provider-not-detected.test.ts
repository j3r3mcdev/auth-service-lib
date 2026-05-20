import { MlXssProvider } from "../providers/ml-xss-provider";
import { AdvancedXssDetector } from "../detectors/advanced-xss-detector";
import { xssCheck } from "../xss-check";

describe("WAF ML runtime - cas non détecté", () => {
  it("laisse passer la requête quand le ML ne détecte rien", async () => {
    const mockModel = jest.fn((input: string) => {
      return 10; // score faible → pas d'attaque
    });

    const mlProvider = new MlXssProvider(50, mockModel);
    const detector = new AdvancedXssDetector(mlProvider);

    const middleware = xssCheck(detector);

    const req: any = {
      body: { payload: "hello world" },
      headers: {}, // ← obligatoire
    };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    await middleware(req, res, next);

    // Le modèle doit être appelé
    expect(mockModel).toHaveBeenCalledWith("hello world");

    // Le middleware ne doit PAS bloquer
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();

    // next() doit être appelé → requête autorisée
    expect(next).toHaveBeenCalled();
  });
});
