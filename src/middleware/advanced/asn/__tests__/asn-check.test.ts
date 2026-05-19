import { asnCheck } from "../asn-check";
import { MockAsnProvider } from "../mock-asn-provider";

describe("asnCheck middleware", () => {
  it("retourne 400 si le provider ne peut pas déterminer l'ASN", () => {
    const provider = new MockAsnProvider({
      "1.2.3.4": null,
    });

    const middleware = asnCheck(provider, [15169]);

    const req: any = { ip: "1.2.3.4" };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unable to determine ASN for IP",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("retourne 403 si l'ASN est bloqué", () => {
    const provider = new MockAsnProvider({
      "8.8.8.8": 15169,
    });

    const middleware = asnCheck(provider, [15169]);

    const req: any = { ip: "8.8.8.8" };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Access forbidden for ASN: 15169",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("laisse passer si l'ASN n'est pas bloqué", () => {
    const provider = new MockAsnProvider({
      "1.1.1.1": 13335,
    });

    const middleware = asnCheck(provider, [15169]);

    const req: any = { ip: "1.1.1.1" };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
