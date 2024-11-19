import type { WordStyleService } from "../word/WordStyleService";
import type { RandomGenerator } from "../random/RandomGenerator";
import type { WordListProvider } from "../word/WordListProvider";
import type { PassphraseOptions } from "../../types";

import { ErrorHandler } from "../../errors";

/**
 * Service for generating memorable passphrases from word lists
 * Combines random words with configurable formatting and separators
 *
 * @class PassphraseGeneratorService
 *
 * @example
 * ```typescript
 * const generator = new PassphraseGeneratorService(
 *   randomGenerator,
 *   wordListProvider,
 *   wordStyleService
 * );
 *
 * const passphrase = generator.generatePassphrase({
 *   wordCount: 4,
 *   style: 'capitalize',
 *   includeNumber: true
 * });
 * // Result example: "Correct-Horse-Battery-Staple42"
 * ```
 */
export class PassphraseGeneratorService {
  /** Default separator between words */
  private static readonly DEFAULT_SEPARATOR = "-";
  /** Default number of words in passphrase */
  private static readonly DEFAULT_WORD_COUNT = 4;

  /**
   * Creates a new passphrase generator with required dependencies
   * @param randomGenerator - Service for generating random values
   * @param wordListProvider - Service for accessing word list
   * @param wordStyleService - Service for word formatting
   */
  constructor(
    private readonly randomGenerator: RandomGenerator,
    private readonly wordListProvider: WordListProvider,
    private readonly wordStyleService: WordStyleService,
  ) {}

  /**
   * Generates a passphrase based on provided options
   *
   * @param options - Passphrase generation options
   * @returns Generated passphrase
   * @throws {GeneratorError} If options are invalid
   *
   * @example
   * ```typescript
   * // Generate with defaults
   * const basic = generator.generatePassphrase();
   * // "word-word-word-word-word"
   *
   * // Generate with custom options
   * const custom = generator.generatePassphrase({
   *   wordCount: 3,
   *   separator: "_",
   *   style: "uppercase",
   *   includeNumber: true
   * });
   * // "WORD_WORD4_WORD"
   * ```
   */
  public generatePassphrase(options: PassphraseOptions): string {
    this.validateOptions(options.wordCount);

    // Generate and format words
    const words: string[] = Array.from({ length: options.wordCount }, () =>
      this.wordStyleService.formatWord(
        this.wordListProvider.getRandomWord(this.randomGenerator),
        options.style,
      ),
    );

    // Add random digit if requested
    if (options.includeNumber && words.length > 0) {
      const randomIndex = this.randomGenerator.getRandomNumber(
        options.wordCount,
      );

      words[randomIndex] = words[randomIndex] + this.generateRandomDigit();
    }

    return words.join(options.separator);
  }

  /**
   * Returns the initial (default) options for passphrase generation
   * These values are used when no options are provided to generatePassphrase
   *
   * @returns Default passphrase generation options
   *
   * @example
   * ```typescript
   * const defaults = generator.getInitialOptions();
   * // {
   * //   wordCount: 5,
   * //   separator: "-",
   * //   includeNumber: false,
   * //   style: "lowercase"
   * // }
   * ```
   */
  public getInitialOptions(): PassphraseOptions {
    return {
      wordCount: PassphraseGeneratorService.DEFAULT_WORD_COUNT,
      separator: PassphraseGeneratorService.DEFAULT_SEPARATOR,
      includeNumber: false,
      style: "lowercase",
    };
  }

  /**
   * Validates passphrase generation options
   * @param wordCount - Number of words requested
   * @throws {GeneratorError} If word count is invalid or word list is empty
   * @private
   */
  private validateOptions(wordCount: number): void {
    if (wordCount < 1) {
      throw ErrorHandler.createError("INVALID_WORD_COUNT");
    }

    if (this.wordListProvider.getWords().length === 0) {
      throw ErrorHandler.createError("EMPTY_WORD_LIST");
    }
  }

  /**
   * Generates a random single digit (0-9)
   * @returns Single digit as string
   * @private
   */
  private generateRandomDigit(): string {
    return this.randomGenerator.getRandomNumber(10).toString();
  }
}
