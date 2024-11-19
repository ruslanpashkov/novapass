import type { PasswordOptions, CharacterSet } from "../../types";

import { ALLOWED_CHARACTERS } from "../../constants/characters";
import { ErrorHandler } from "../../errors";

/**
 * Service for validating password requirements and constraints
 * Ensures passwords meet specified character set and length requirements
 *
 * @class PasswordValidationService
 *
 * @example
 * ```typescript
 * const validator = new PasswordValidationService();
 *
 * // Validate password requirements
 * const isValid = validator.validatePasswordRequirements(
 *   "Test123!",
 *   {
 *     uppercase: true,
 *     numbers: true,
 *     symbols: true
 *   }
 * );
 * ```
 */
export class PasswordValidationService {
  /**
   * Regular expressions for validating presence of character types
   * Maps character sets to their validation patterns
   *
   * @private
   * @readonly
   */
  private static readonly CHARACTER_RULES = new Map<CharacterSet, RegExp>([
    [
      "symbols",
      new RegExp(`[${ALLOWED_CHARACTERS.symbols.replace(/[[\]\\]/g, "\\$&")}]`),
    ],
    ["lowercase", /[a-z]/],
    ["uppercase", /[A-Z]/],
    ["numbers", /[0-9]/],
  ]);

  /**
   * Calculates minimum required password length based on enabled character sets
   * Each enabled character set requires at least one character
   *
   * @param options - Password generation options
   * @returns Minimum required length
   * @private
   *
   * @example
   * ```typescript
   * // If uppercase, lowercase, and numbers are enabled:
   * const minLength = calculateMinimumLength({
   *   uppercase: true,
   *   lowercase: true,
   *   numbers: true,
   *   symbols: false
   * });
   * // Returns: 3
   * ```
   */
  private calculateMinimumLength(options: PasswordOptions): number {
    return Object.entries(options).filter(
      ([key, value]) =>
        key !== "length" && key !== "customization" && value === true,
    ).length;
  }

  /**
   * Validates that a password meets all required character set constraints
   * Checks presence of characters from each enabled set
   *
   * @param password - Password to validate
   * @param options - Password requirements
   * @returns Boolean indicating if password meets all requirements
   *
   * @example
   * ```typescript
   * const isValid = validator.validatePasswordRequirements(
   *   "Example123!",
   *   {
   *     uppercase: true,
   *     lowercase: true,
   *     numbers: true,
   *     symbols: true
   *   }
   * );
   * // Returns: true
   * ```
   */
  public validatePasswordRequirements(
    password: string,
    options: PasswordOptions,
  ): boolean {
    return Array.from(
      PasswordValidationService.CHARACTER_RULES.entries(),
    ).every(
      ([characterSet, rule]) => !options[characterSet] || rule.test(password),
    );
  }

  /**
   * Validates that requested password length is sufficient for all requirements
   * Ensures length is at least equal to number of enabled character sets
   *
   * @param options - Password generation options
   * @throws {GeneratorError} If length is insufficient for requirements
   *
   * @example
   * ```typescript
   * // This will throw an error because length 2 is too short for 3 required sets
   * validator.validatePasswordLength({
   *   length: 2,
   *   uppercase: true,
   *   lowercase: true,
   *   numbers: true
   * });
   * ```
   */
  public validatePasswordLength(options: PasswordOptions): void {
    const minLength = this.calculateMinimumLength(options);

    if (minLength > options.length) {
      throw ErrorHandler.createError("INVALID_PASSWORD_LENGTH");
    }
  }
}
