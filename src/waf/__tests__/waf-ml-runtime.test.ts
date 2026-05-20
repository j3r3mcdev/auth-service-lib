import { waf } from "../waf";

describe("WAF FULL RUNTIME (tous les middlewares actifs)", () => {
  it("laisse passer une requête totalement clean", async () => {
    const chain = waf({
      // tout est activé par défaut
    });

    const req: any = {
      body: { message: "hello world" },
      query: {},
      params: {},
      headers: {
        "user-agent": "Mozilla/5.0",
        "x-forwarded-for": "127.0.0.1",
      },
      ip: "127.0.0.1",
    };

    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const next = jest.fn();

    for (const mw of chain) {
      await mw(req, res, next);
      if (res.status.mock.calls.length > 0) break;
    }

    // Aucun middleware ne doit bloquer
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();

    // Le pipeline doit se terminer proprement
    expect(next).toHaveBeenCalled();
  });
});
