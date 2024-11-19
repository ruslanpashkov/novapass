import type { PasswordOptions, CharacterPool } from "../../types";

import { ALLOWED_CHARACTERS } from "../../constants/characters";
import { ErrorHandler } from "../../errors";

/**
 * Service for managing character pools in password generation
 * Handles character selection, exclusion, and pool building based on options
 *
 * @class CharacterPoolService
 */
export class CharacterPoolService {
  /**
   * Regular expression for identifying similar-looking characters
   * Used when skipAmbiguous option is enabled
   * @private
   * @readonly
   */
  private static readonly SIMILAR_CHARACTERS = /[lI1|`O0]/g;

  /**
   * Base character pools for each character type
   * Initialized from allowed characters constant
   * @private
   * @readonly
   */
  private readonly CHARACTER_POOLS: CharacterPool = {
    lowercase: ALLOWED_CHARACTERS.lowercase,
    uppercase: ALLOWED_CHARACTERS.uppercase,
    symbols: ALLOWED_CHARACTERS.symbols,
    numbers: ALLOWED_CHARACTERS.numbers,
  };

  /**
   * Gets an array of required characters based on password options
   * Ensures at least one character from each enabled set is included
   *
   * @param options - Password generation options
   * @returns Array of characters, one from each enabled set
   *
   * @example
   * ```typescript
   * const service = new CharacterPoolService();
   * const chars = service.getRequiredChars({
   *   lowercase: true,
   *   uppercase: true,
   *   numbers: false,
   *   symbols: false,
   *   customization: {
   *     skipAmbiguous: true,
   *     exclude: 'aeiou'
   *   }
   * });
   * // Returns e.g., ['k', 'M']
   * ```
   */
  public getRequiredChars(options: PasswordOptions): string[] {
    const pools: CharacterPool = { ...this.CHARACTER_POOLS };

    // Remove ambiguous characters if requested
    if (options.customization.skipAmbiguous) {
      (Object.keys(pools) as Array<keyof CharacterPool>).forEach((key) => {
        pools[key] = pools[key].replace(
          CharacterPoolService.SIMILAR_CHARACTERS,
          "",
        );
      });
    }

    // Remove excluded characters
    if (options.customization.exclude) {
      const excludePattern = new RegExp(
        `[${options.customization.exclude.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}]`,
        "g",
      );

      (Object.keys(pools) as Array<keyof CharacterPool>).forEach((key) => {
        pools[key] = pools[key].replace(excludePattern, "");
      });
    }

    const chars: string[] = [];

    // Select one random character from each enabled pool
    if (options.lowercase && pools.lowercase)
      chars.push(
        pools.lowercase[Math.floor(Math.random() * pools.lowercase.length)],
      );

    if (options.uppercase && pools.uppercase)
      chars.push(
        pools.uppercase[Math.floor(Math.random() * pools.uppercase.length)],
      );

    if (options.numbers && pools.numbers)
      chars.push(
        pools.numbers[Math.floor(Math.random() * pools.numbers.length)],
      );

    if (options.symbols && pools.symbols)
      chars.push(
        pools.symbols[Math.floor(Math.random() * pools.symbols.length)],
      );

    return chars;
  }

  /**
   * Builds a complete character pool based on password options
   * Combines enabled character sets and applies exclusion rules
   *
   * @param options - Password generation options
   * @returns String containing all allowed characters
   * @throws {GeneratorError} If resulting pool is empty
   *
   * @example
   * ```typescript
   * const service = new CharacterPoolService();
   * const pool = service.buildCharacterPool({
   *   lowercase: true,
   *   uppercase: true,
   *   numbers: true,
   *   symbols: false,
   *   customization: {
   *     skipAmbiguous: true,
   *     exclude: '0O'
   *   }
   * });
   * ```
   */
  public buildCharacterPool(options: PasswordOptions): string {
    let pool = "";

    // Add characters from enabled sets
    if (options.lowercase) pool += this.CHARACTER_POOLS.lowercase;
    if (options.uppercase) pool += this.CHARACTER_POOLS.uppercase;
    if (options.numbers) pool += this.CHARACTER_POOLS.numbers;
    if (options.symbols) pool += this.CHARACTER_POOLS.symbols;

    if (!pool) {
      throw ErrorHandler.createError("EMPTY_CHARACTER_POOL");
    }

    // Remove ambiguous characters if requested
    if (options.customization.skipAmbiguous) {
      pool = pool.replace(CharacterPoolService.SIMILAR_CHARACTERS, "");
    }

    // Remove excluded characters
    const excludeChars = options.customization.exclude.split("");

    for (const char of excludeChars) {
      pool = pool.replace(
        new RegExp(char.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
        "",
      );
    }

    if (pool.length === 0) {
      throw ErrorHandler.createError("EMPTY_POOL_AFTER_EXCLUSION");
    }

    return pool;
  }
}
