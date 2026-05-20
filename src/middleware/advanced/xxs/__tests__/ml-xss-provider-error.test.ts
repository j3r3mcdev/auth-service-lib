import { AdvancedXssDetector } from "../detectors/advanced-xss-detector";
import { xssCheck } from "../xss-check";

describe("WAF ML runtime - erreur modèle", () => {
  it("bloque la requête si le modèle ML plante", async () => {
    const mockModel = jest.fn((input: string) => {
      throw new Error("ML failure");
    });

    const provider = {
      threshold: 50,
      score: (input: string) => mockModel(input),
    };

    const detector = new AdvancedXssDetector(provider);
    const middleware = xssCheck(detector);

    const req: any = {
      body: { payload: "<script>alert(1)</script>" },
      headers: {},
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    await middleware(req, res, next);

    expect(mockModel).toHaveBeenCalled();

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalled();

    expect(next).not.toHaveBeenCalled();
  });
});
