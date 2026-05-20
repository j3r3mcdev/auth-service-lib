import { MockBotDetector } from "../detectors/mock-bot-detector";

describe("MockBotDetector", () => {
  test("retourne toujours la valeur fournie", () => {
    expect(new MockBotDetector(true).isBot("UA")).toBe(true);
    expect(new MockBotDetector(false).isBot("UA")).toBe(false);
  });
});
