import { hashPassword } from "../src/utils/hashing";
import bcrypt from "bcrypt";

describe("hashPassword", () => {
  it("hashes a password (success)", async () => {
    const hash = await hashPassword("test123");
    expect(typeof hash).toBe("string");
    expect(hash.startsWith("$2")).toBe(true);
  });

  it("generates different hashes for the same password", async () => {
    const h1 = await hashPassword("test123");
    const h2 = await hashPassword("test123");
    expect(h1).not.toBe(h2);
  });

  it("produces a hash that bcrypt can verify", async () => {
    const hash = await hashPassword("test123");
    const ok = await bcrypt.compare("test123", hash);
    expect(ok).toBe(true);
  });

  it("throws if password is empty", async () => {
    await expect(hashPassword("")).rejects.toThrow();
  });
});
