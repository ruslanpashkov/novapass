import { describe, expect, it } from "vitest";

import { passphraseGenerator } from "..";

describe("Passphrase Generator", () => {
  describe("initial options", () => {
    it("returns default passphrase generator options", () => {
      const initialOptions = passphraseGenerator.getInitialOptions();

      expect(initialOptions).toEqual({
        includeNumber: false,
        style: "lowercase",
        separator: "-",
        wordCount: 4,
      });
    });
  });

  describe("word count", () => {
    it("generates passphrase with the specified number of words", () => {
      const wordCounts = [3, 4, 5, 6, 7];

      for (const wordCount of wordCounts) {
        const passphrase = passphraseGenerator.generatePassphrase({
          includeNumber: false,
          style: "lowercase",
          separator: "-",
          wordCount,
        });

        expect(passphrase.split("-")).toHaveLength(wordCount);
      }
    });

    it("throws error for invalid word count", () => {
      expect(() =>
        passphraseGenerator.generatePassphrase({
          includeNumber: false,
          style: "lowercase",
          separator: "-",
          wordCount: 0,
        }),
      ).toThrowError("Word count must be at least 1");
    });
  });

  describe("word style", () => {
    it("generates lowercase words", () => {
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: false,
        style: "lowercase",
        separator: "-",
        wordCount: 4,
      });

      expect(passphrase).toMatch(/^[a-z]+-[a-z]+-[a-z]+-[a-z]+$/);
    });

    it("generates uppercase words", () => {
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: false,
        style: "uppercase",
        separator: "-",
        wordCount: 4,
      });

      expect(passphrase).toMatch(/^[A-Z]+-[A-Z]+-[A-Z]+-[A-Z]+$/);
    });

    it("generates capitalized words", () => {
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: false,
        style: "capitalize",
        separator: "-",
        wordCount: 4,
      });

      expect(passphrase).toMatch(
        /^[A-Z][a-z]*-[A-Z][a-z]*-[A-Z][a-z]*-[A-Z][a-z]*$/,
      );
    });
  });

  describe("word separator", () => {
    it("allows custom separators", () => {
      const separators = ["_", ".", ":", "|"];

      for (const separator of separators) {
        const passphrase = passphraseGenerator.generatePassphrase({
          includeNumber: false,
          style: "lowercase",
          wordCount: 4,
          separator,
        });

        expect(passphrase).toMatch(
          new RegExp(
            `^[a-z]+\\${separator}[a-z]+\\${separator}[a-z]+\\${separator}[a-z]+$`,
          ),
        );
      }
    });

    it("allows empty separator", () => {
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: false,
        style: "lowercase",
        separator: "",
        wordCount: 4,
      });

      expect(passphrase).toMatch(/^[a-z]+[a-z]+[a-z]+[a-z]+$/);
    });

    it("allows space as separator", () => {
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: false,
        style: "lowercase",
        separator: " ",
        wordCount: 4,
      });

      expect(passphrase).toMatch(/^[a-z]+ [a-z]+ [a-z]+ [a-z]+$/);
    });

    it("allows multiple characters as separator", () => {
      const separator = "o_0";
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: false,
        style: "lowercase",
        wordCount: 4,
        separator,
      });

      expect(passphrase).toMatch(
        new RegExp(
          `^[a-z]+\\${separator}[a-z]+\\${separator}[a-z]+\\${separator}[a-z]+$`,
        ),
      );
    });
  });

  describe("number inclusion", () => {
    it("includes a number when specified", () => {
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: true,
        style: "lowercase",
        separator: "-",
        wordCount: 4,
      });

      expect(passphrase).toMatch(/[0-9]/);
    });

    it("does not include a number when not specified", () => {
      const passphrase = passphraseGenerator.generatePassphrase({
        includeNumber: false,
        style: "lowercase",
        separator: "-",
        wordCount: 4,
      });

      expect(passphrase).not.toMatch(/[0-9]/);
    });
  });
});
