import { IP2LocationProvider } from "../provider/ip2location-provider";

describe("IP2LocationProvider", () => {
  it("retourne countryShort si présent", () => {
    const fakeDb = {
      getAll: jest.fn().mockReturnValue({ countryShort: "FR" }),
    };

    const provider = new IP2LocationProvider(fakeDb);

    expect(provider.lookup("1.2.3.4")).toBe("FR");
    expect(fakeDb.getAll).toHaveBeenCalledWith("1.2.3.4");
  });

  it("retourne null si getAll échoue", () => {
    const fakeDb = {
      getAll: jest.fn(() => {
        throw new Error("fail");
      }),
    };

    const provider = new IP2LocationProvider(fakeDb);

    expect(provider.lookup("1.2.3.4")).toBeNull();
  });
});
