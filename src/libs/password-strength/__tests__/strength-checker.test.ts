import { beforeAll, describe, expect, it } from "vitest";

import { strengthChecker } from "..";

describe("Password Strength Checker", () => {
  beforeAll(() => {
    strengthChecker.initialize();
  });

  it.each([
    ["empty string", "", 0],
    ["very weak password (digits only)", "12345", 0],
    ["very weak password (letters only)", "abcdef", 0],
    ["very weak password (common pattern)", "password123", 0],
    ["very weak password (short length + special chars)", "a1!", 0],
    ["weak password (common pattern + complexity)", "qwerty7@A", 1],
    ["average password (some complexity)", "abc_123!", 2],
    ["strong password (length + complexity)", "abc_123!@#", 3],
    ["very strong password", "aBc_123!@#xyz456$", 4],
    ["very strong long password", "thisisaverylongpassword12345678", 4],
  ])(
    "should return a strength score of %d for %s",
    async (_, password, expectedScore) => {
      const result = await strengthChecker.checkStrength(password);

      expect(result.score).toBe(expectedScore);
    },
  );

  it("should provide feedback for weak passwords", async () => {
    const result = await strengthChecker.checkStrength("123456");

    expect(result.feedback.suggestions.length).toBeGreaterThan(0);
  });

  it("should return a low score for repetitive characters", async () => {
    const result = await strengthChecker.checkStrength("aaaaaaaa");

    expect(result.score).toBe(0);
  });

  it("should return a high score for a complex password", async () => {
    const result = await strengthChecker.checkStrength("A1b!C2d$E3fG@H4i");

    expect(result.score).toBe(4);
  });

  it("should correctly handle Unicode characters", async () => {
    const result = await strengthChecker.checkStrength("P@ssw0rd𠜎𠜎𠜎!");

    expect(result.score).toBeGreaterThanOrEqual(3);
  });

  it("should penalize sequential numbers and letters", async () => {
    const result = await strengthChecker.checkStrength("12345abcde");

    expect(result.score).toBeLessThan(3);
  });
});
