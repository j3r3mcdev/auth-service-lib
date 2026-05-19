import { geoIpCheck } from "../geoip-check";
import { MockGeoIpProvider } from "../provider/mock-provider";

describe("geoIpCheck middleware", () => {
  it("retourne 400 si le provider ne peut pas déterminer le pays", () => {
    const provider = new MockGeoIpProvider({
      "1.2.3.4": null,
    });

    const middleware = geoIpCheck(provider, ["FR"]);

    const req: any = { ip: "1.2.3.4" };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      error: "Unable to determine country for IP",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("retourne 403 si le pays est bloqué", () => {
    const provider = new MockGeoIpProvider({
      "5.6.7.8": "CN",
    });

    const middleware = geoIpCheck(provider, ["CN"]);

    const req: any = { ip: "5.6.7.8" };
    const res: any = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    const next = jest.fn();

    middleware(req, res, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({
      error: "Access forbidden from country: CN",
    });
    expect(next).not.toHaveBeenCalled();
  });

  it("laisse passer si le pays n'est pas bloqué", () => {
    const provider = new MockGeoIpProvider({
      "9.9.9.9": "FR",
    });

    const middleware = geoIpCheck(provider, ["CN"]);

    const req: any = { ip: "9.9.9.9" };
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
