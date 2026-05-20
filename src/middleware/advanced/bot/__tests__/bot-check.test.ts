import { botCheck } from "../bot-check";
import { MockBotDetector } from "../detectors/mock-bot-detector";

const mockReq = (ua?: string) => ({
  headers: { "user-agent": ua },
});

const mockRes = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("botCheck middleware", () => {
  test("bloque quand le détecteur renvoie true", () => {
    const detector = new MockBotDetector(true);
    const middleware = botCheck(detector);

    const req = mockReq("Googlebot");
    const res = mockRes();
    const next = jest.fn();

    middleware(req as any, res as any, next);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: "Bot detected" });
    expect(next).not.toHaveBeenCalled();
  });

  test("laisse passer quand le détecteur renvoie false", () => {
    const detector = new MockBotDetector(false);
    const middleware = botCheck(detector);

    const req = mockReq("Mozilla/5.0");
    const res = mockRes();
    const next = jest.fn();

    middleware(req as any, res as any, next);

    expect(next).toHaveBeenCalled();
  });
});
