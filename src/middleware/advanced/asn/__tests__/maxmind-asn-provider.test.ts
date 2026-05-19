import { MaxMindAsnProvider } from "../providers/maxmind-asn-provider";

describe("MaxMindAsnProvider", () => {
  it("retourne l'ASN si présent", () => {
    const fakeReader = {
      get: jest.fn().mockReturnValue({
        autonomous_system_number: 15169,
      }),
    };

    const provider = new MaxMindAsnProvider(fakeReader);

    expect(provider.lookup("8.8.8.8")).toBe(15169);
    expect(fakeReader.get).toHaveBeenCalledWith("8.8.8.8");
  });

  it("retourne null si get retourne rien", () => {
    const fakeReader = {
      get: jest.fn().mockReturnValue(null),
    };

    const provider = new MaxMindAsnProvider(fakeReader);

    expect(provider.lookup("8.8.8.8")).toBeNull();
  });

  it("retourne null si get lance une erreur", () => {
    const fakeReader = {
      get: jest.fn(() => {
        throw new Error("fail");
      }),
    };

    const provider = new MaxMindAsnProvider(fakeReader);

    expect(provider.lookup("8.8.8.8")).toBeNull();
  });
});
