import { MockAsnProvider } from "../mock-asn-provider";

describe("MockAsnProvider", () => {
  it("retourne l'ASN configuré pour une IP donnée", () => {
    const provider = new MockAsnProvider({
      "8.8.8.8": 15169,
      "1.1.1.1": 13335,
    });

    expect(provider.lookup("8.8.8.8")).toBe(15169);
    expect(provider.lookup("1.1.1.1")).toBe(13335);
  });

  it("retourne null si l'IP n'est pas dans la map", () => {
    const provider = new MockAsnProvider({});
    expect(provider.lookup("9.9.9.9")).toBeNull();
  });

  it("retourne null si la valeur est explicitement null", () => {
    const provider = new MockAsnProvider({
      "10.0.0.1": null,
    });

    expect(provider.lookup("10.0.0.1")).toBeNull();
  });
});
