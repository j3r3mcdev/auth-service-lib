import { IP2LocationAsnProvider } from "../providers/ip2location-asn-provider";

describe("IP2LocationAsnProvider", () => {
  it("retourne l'ASN si présent", () => {
    const fakeDb = {
      getAll: jest.fn().mockReturnValue({
        asn: 32934,
      }),
    };

    const provider = new IP2LocationAsnProvider(fakeDb);

    expect(provider.lookup("31.13.71.36")).toBe(32934);
    expect(fakeDb.getAll).toHaveBeenCalledWith("31.13.71.36");
  });

  it("retourne null si getAll retourne rien", () => {
    const fakeDb = {
      getAll: jest.fn().mockReturnValue(null),
    };

    const provider = new IP2LocationAsnProvider(fakeDb);

    expect(provider.lookup("31.13.71.36")).toBeNull();
  });

  it("retourne null si getAll lance une erreur", () => {
    const fakeDb = {
      getAll: jest.fn(() => {
        throw new Error("fail");
      }),
    };

    const provider = new IP2LocationAsnProvider(fakeDb);

    expect(provider.lookup("31.13.71.36")).toBeNull();
  });
});
