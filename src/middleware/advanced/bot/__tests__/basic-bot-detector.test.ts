import { BasicBotDetector } from "../detectors/basic-bot-detector";

describe("BasicBotDetector", () => {
  const detector = new BasicBotDetector();

  test("détecte un user-agent vide comme bot", () => {
    expect(detector.isBot("")).toBe(true);
  });

  test("détecte un user-agent trop court comme bot", () => {
    expect(detector.isBot("abc")).toBe(true);
  });

  test("détecte les patterns bot connus", () => {
    expect(detector.isBot("Googlebot")).toBe(true);
    expect(detector.isBot("curl/7.88.1")).toBe(true);
    expect(detector.isBot("python-requests/2.31")).toBe(true);
  });

  test("ne détecte pas un user-agent normal", () => {
    expect(detector.isBot("Mozilla/5.0 Chrome/120 Safari/537")).toBe(false);
  });
});
