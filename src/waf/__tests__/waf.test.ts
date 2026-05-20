import { waf } from "../waf";

describe("WAF pipeline", () => {
  it("active tous les middlewares par défaut", () => {
    const chain = waf();

    // 7 middlewares : sqli, xss, path, lfi, rfi, user-agent, bot
    expect(chain.length).toBe(7);
  });

  it("désactive un module quand on passe une option", () => {
    const chain = waf({
      rfi: false,
    });

    // 6 middlewares car RFI est désactivé
    expect(chain.length).toBe(6);
  });

  it("désactive plusieurs modules", () => {
    const chain = waf({
      rfi: false,
      lfi: false,
    });

    // 5 middlewares restants
    expect(chain.length).toBe(5);
  });

  it("désactive tout si on met tout à false", () => {
    const chain = waf({
      sqli: false,
      xss: false,
      path: false,
      lfi: false,
      rfi: false,
      userAgent: false,
      bot: false,
    });

    expect(chain.length).toBe(0);
  });
});
