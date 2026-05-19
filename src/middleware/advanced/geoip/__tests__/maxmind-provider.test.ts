import { MaxMindProvider } from "../provider/maxmind-provider";

describe("MaxMindProvider", () => {
  it("retourne iso_code si présent", () => {
    const fakeReader = {
      get: jest.fn().mockReturnValue({
        country: { iso_code: "US" },
      }),
    };

    const provider = new MaxMindProvider(fakeReader);

    expect(provider.lookup("5.6.7.8")).toBe("US");
    expect(fakeReader.get).toHaveBeenCalledWith("5.6.7.8");
  });

  it("retourne null si get retourne rien", () => {
    const fakeReader = {
      get: jest.fn().mockReturnValue(null),
    };

    const provider = new MaxMindProvider(fakeReader);

    expect(provider.lookup("5.6.7.8")).toBeNull();
  });
});
