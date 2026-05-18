import { MockGeoIpProvider } from "../provider/mock-provider";

describe("MockGeoIpProvider", () => {
  it("retourne le pays configuré pour une IP donnée", () => {
    const provider = new MockGeoIpProvider({
      "1.2.3.4": "FR",
      "5.6.7.8": "US",
    });

    expect(provider.lookup("1.2.3.4")).toBe("FR");
    expect(provider.lookup("5.6.7.8")).toBe("US");
  });

  it("retourne null si l'IP n'est pas dans la map", () => {
    const provider = new MockGeoIpProvider({});
    expect(provider.lookup("9.9.9.9")).toBeNull();
  });

  it("retourne null si la valeur est explicitement null", () => {
    const provider = new MockGeoIpProvider({
      "10.0.0.1": null,
    });

    expect(provider.lookup("10.0.0.1")).toBeNull();
  });
});
