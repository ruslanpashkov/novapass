import { describe, expect, it } from "vitest";

import { passwordGenerator } from "..";

describe("Password Generator", () => {
  describe("initial options", () => {
    it("returns default password generator options", () => {
      const initialOptions = passwordGenerator.getInitialOptions();

      expect(initialOptions).toEqual({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        uppercase: true,
        lowercase: true,
        symbols: false,
        numbers: true,
        length: 24,
      });
    });
  });

  describe("password length", () => {
    it("generates password with specified length", () => {
      const lengths = [4, 8, 12, 16, 32, 64];

      for (const length of lengths) {
        const password = passwordGenerator.generatePassword({
          customization: {
            skipAmbiguous: false,
            exclude: "",
          },
          uppercase: true,
          lowercase: true,
          symbols: false,
          numbers: true,
          length,
        });

        expect(password).toHaveLength(length);
      }
    });

    it("generates password with great length", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true,
        length: 128,
      });

      expect(password).toHaveLength(128);
    });

    it("generates password with minimum length and all character types", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        uppercase: true,
        lowercase: true,
        symbols: true,
        numbers: true,
        length: 4,
      });

      expect(password).toHaveLength(4);
      expect(password).toMatch(/[A-Z]/);
      expect(password).toMatch(/[a-z]/);
      expect(password).toMatch(/[0-9]/);
      expect(password).toMatch(/[!@#$%^&*]/);
    });

    it("throws error for invalid length", () => {
      expect(() =>
        passwordGenerator.generatePassword({
          customization: {
            skipAmbiguous: false,
            exclude: "",
          },
          uppercase: true,
          lowercase: true,
          symbols: false,
          numbers: true,
          length: 0,
        }),
      ).toThrowError("Length must correlate with strict guidelines");

      expect(() =>
        passwordGenerator.generatePassword({
          customization: {
            skipAmbiguous: false,
            exclude: "",
          },
          uppercase: true,
          lowercase: true,
          symbols: false,
          numbers: true,
          length: -12,
        }),
      ).toThrowError("Length must correlate with strict guidelines");

      expect(() =>
        passwordGenerator.generatePassword({
          customization: {
            skipAmbiguous: false,
            exclude: "",
          },
          uppercase: true,
          lowercase: true,
          symbols: false,
          numbers: true,
          length: 10.5,
        }),
      ).toThrowError("Length must correlate with strict guidelines");
    });
  });

  describe("character sets", () => {
    it("includes only uppercase letters when specified", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        lowercase: false,
        uppercase: true,
        symbols: false,
        numbers: false,
        length: 24,
      });

      expect(password).toMatch(/^[A-Z]+$/);
      expect(password).not.toMatch(/[a-z0-9!@#$%^&*]/);
    });

    it("includes only lowercase letters when specified", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        uppercase: false,
        lowercase: true,
        symbols: false,
        numbers: false,
        length: 24,
      });

      expect(password).toMatch(/^[a-z]+$/);
      expect(password).not.toMatch(/[A-Z0-9!@#$%^&*]/);
    });

    it("includes only numbers when specified", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        uppercase: false,
        lowercase: false,
        symbols: false,
        numbers: true,
        length: 24,
      });

      expect(password).toMatch(/^[0-9]+$/);
      expect(password).not.toMatch(/[a-zA-Z!@#$%^&*]/);
    });

    it("includes only symbols when specified", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        uppercase: false,
        lowercase: false,
        numbers: false,
        symbols: true,
        length: 24,
      });

      expect(password).toMatch(/^[!@#$%^&*]+$/);
      expect(password).not.toMatch(/[a-zA-Z0-9]/);
    });

    it("includes only symbols and numbers when specified", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "",
        },
        uppercase: false,
        lowercase: false,
        symbols: true,
        numbers: true,
        length: 24,
      });

      expect(password).toMatch(/^[0-9!@#$%^&*]+$/);
      expect(password).not.toMatch(/[a-zA-Z]/);
    });

    it("throws error when no character sets are selected", () => {
      expect(() =>
        passwordGenerator.generatePassword({
          customization: {
            skipAmbiguous: false,
            exclude: "",
          },
          uppercase: false,
          lowercase: false,
          symbols: false,
          numbers: false,
          length: 24,
        }),
      ).toThrowError("Character pool cannot be empty");
    });
  });

  describe("customization options", () => {
    it("excludes ambiguous characters when specified", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: true,
          exclude: "",
        },
        uppercase: true,
        lowercase: true,
        symbols: false,
        numbers: true,
        length: 24,
      });

      expect(password).not.toMatch(/[Il1O0]/);
    });

    it("excludes specified characters", () => {
      const excludeCharacters = "abc123";
      const password = passwordGenerator.generatePassword({
        customization: {
          exclude: excludeCharacters,
          skipAmbiguous: false,
        },
        uppercase: true,
        lowercase: true,
        symbols: false,
        numbers: true,
        length: 24,
      });

      expect(password).not.toMatch(excludeCharacters);
    });

    it("excludes specified characters with ambiguous characters", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: true,
          exclude: "abc123",
        },
        uppercase: true,
        lowercase: true,
        symbols: false,
        numbers: true,
        length: 24,
      });

      expect(password).not.toMatch(/[Il1O0]/);
      expect(password).not.toMatch(/[abc123]/);
    });

    it("generates password with excluded characters matching ambiguous set", () => {
      const password = passwordGenerator.generatePassword({
        customization: {
          skipAmbiguous: false,
          exclude: "Il1O0",
        },
        uppercase: true,
        lowercase: true,
        symbols: false,
        numbers: true,
        length: 24,
      });

      expect(password).not.toMatch(/[Il1O0]/);
    });

    it("throws error when all available characters are excluded", () => {
      expect(() =>
        passwordGenerator.generatePassword({
          customization: {
            exclude: "0123456789",
            skipAmbiguous: false,
          },
          uppercase: false,
          lowercase: false,
          symbols: false,
          numbers: true,
          length: 24,
        }),
      ).toThrowError("No characters remaining after applying exclusions");

      expect(() =>
        passwordGenerator.generatePassword({
          customization: {
            exclude: "abcdefghijklmnopqrstuvwxyz",
            skipAmbiguous: false,
          },
          uppercase: false,
          lowercase: true,
          symbols: false,
          numbers: false,
          length: 24,
        }),
      ).toThrowError("No characters remaining after applying exclusions");

      expect(() =>
        passwordGenerator.generatePassword({
          customization: {
            exclude: "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
            skipAmbiguous: false,
          },
          uppercase: true,
          lowercase: true,
          symbols: false,
          numbers: false,
          length: 24,
        }),
      ).toThrowError("No characters remaining after applying exclusions");
    });
  });
});
