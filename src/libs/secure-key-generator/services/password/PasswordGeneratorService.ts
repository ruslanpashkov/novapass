import type { PasswordValidationService } from "../validation/PasswordValidationService";
import type { CharacterPoolService } from "../character/CharacterPoolService";
import type { RandomGenerator } from "../random/RandomGenerator";
import type { PasswordOptions } from "../../types";

import { ErrorHandler } from "../../errors";

/**
 * Service for generating secure passwords with configurable requirements
 * Ensures generated passwords meet all specified criteria
 *
 * @class PasswordGeneratorService
 *
 * @example
 * ```typescript
 * const generator = new PasswordGeneratorService(
 *   randomGenerator,
 *   characterPoolService,
 *   validationService
 * );
 *
 * const password = generator.generatePassword({
 *   length: 16,
 *   uppercase: true,
 *   numbers: true,
 *   symbols: false,
 *   customization: {
 *     skipAmbiguous: true,
 *     exclude: 'meow'
 *   }
 * });
 * ```
 */
export class PasswordGeneratorService {
  /** Maximum attempts to generate a valid password before failing */
  private static readonly MAX_ATTEMPTS = 1000;
  /** Minimum required size of character pool */
  private static readonly MIN_POOL_SIZE = 1;

  /**
   * Creates a new password generator with required dependencies
   * @param randomGenerator - Service for generating cryptographically secure random values
   * @param characterPoolService - Service for managing character sets
   * @param validationService - Service for validating password requirements
   * @throws {GeneratorError} If MAX_ATTEMPTS is not positive
   */
  constructor(
    private readonly randomGenerator: RandomGenerator,
    private readonly characterPoolService: CharacterPoolService,
    private readonly validationService: PasswordValidationService,
  ) {
    if (PasswordGeneratorService.MAX_ATTEMPTS <= 0) {
      throw ErrorHandler.createError("INVALID_MAX_ATTEMPTS");
    }
  }

  /**
   * Generates a password meeting all specified requirements
   * Attempts multiple generations if needed to meet criteria
   *
   * @param options - Password generation options
   * @returns Generated password meeting all requirements
   * @throws {GeneratorError} If unable to generate valid password or options are invalid
   *
   * @example
   * ```typescript
   * const password = generator.generatePassword({
   *   length: 20,
   *   uppercase: true,
   *   lowercase: true,
   *   numbers: true,
   *   symbols: true,
   *   customization: {
   *     skipAmbiguous: true,
   *     exclude: ''
   *   }
   * });
   * ```
   */
  public generatePassword(options: PasswordOptions): string {
    this.validationService.validatePasswordLength(options);

    const pool = this.characterPoolService.buildCharacterPool(options);

    if (pool.length < PasswordGeneratorService.MIN_POOL_SIZE) {
      throw ErrorHandler.createError("EMPTY_CHARACTER_POOL");
    }

    let attempts = 0;

    // Attempt generation until valid password is created or max attempts reached
    while (attempts < PasswordGeneratorService.MAX_ATTEMPTS) {
      const password = this.generateAttempt(options.length, options, pool);

      if (
        this.validationService.validatePasswordRequirements(password, options)
      ) {
        return password;
      }

      attempts++;
    }

    throw ErrorHandler.createError("MAX_ATTEMPTS_EXCEEDED");
  }

  /**
   * Returns the initial (default) options for password generation
   * These values are used when no options are provided to generatePassword
   *
   * @returns Default password generation options
   *
   * @example
   * ```typescript
   * const defaults = generator.getInitialOptions();
   * // {
   * //   length: 24,
   * //   uppercase: true,
   * //   lowercase: true,
   * //   numbers: true,
   * //   symbols: false,
   * //   customization: {
   * //     skipAmbiguous: false,
   * //     exclude: ""
   * //   }
   * // }
   * ```
   */
  public getInitialOptions(): PasswordOptions {
    return {
      customization: {
        skipAmbiguous: false,
        exclude: "",
      },
      uppercase: true,
      lowercase: true,
      symbols: false,
      numbers: true,
      length: 24,
    };
  }

  /**
   * Generates a single password attempt
   * Ensures required characters are included and randomly placed
   *
   * @param length - Desired password length
   * @param options - Password generation options
   * @param pool - Character pool to use
   * @returns Generated password attempt
   * @private
   */
  private generateAttempt(
    length: number,
    options: PasswordOptions,
    pool: string,
  ): string {
    // Create TypedArray for secure random values
    const randomValues = new Uint32Array(length * 2); // Extra values in case of modulo bias

    crypto.getRandomValues(randomValues);

    const chars: string[] = [];

    // Get required characters from each enabled set
    const requiredChars = this.characterPoolService.getRequiredChars(options);

    chars.push(...requiredChars);

    // Fill remaining length with secure random characters
    let valueIndex = 0;

    while (chars.length < length) {
      // Reject values that would create modulo bias
      let randomValue = randomValues[valueIndex];
      const maxAcceptable =
        Math.floor(0xffffffff / pool.length) * pool.length - 1;

      // Get next value if current would introduce bias
      while (randomValue > maxAcceptable) {
        valueIndex++;

        if (valueIndex >= randomValues.length) {
          // If we run out of values, get more
          crypto.getRandomValues(randomValues);
          valueIndex = 0;
        }

        randomValue = randomValues[valueIndex];
      }

      chars.push(pool[randomValue % pool.length]);
      valueIndex++;
    }

    // Randomly shuffle using Fisher-Yates with cryptographically secure values
    for (let i = chars.length - 1; i > 0; i--) {
      // Get new secure random values for shuffling
      const shuffleValues = new Uint32Array(1);

      crypto.getRandomValues(shuffleValues);

      // Reject values that would create modulo bias
      let randomValue = shuffleValues[0];
      const maxAcceptable = Math.floor(0xffffffff / (i + 1)) * (i + 1) - 1;

      while (randomValue > maxAcceptable) {
        crypto.getRandomValues(shuffleValues);
        randomValue = shuffleValues[0];
      }

      const j = randomValue % (i + 1);

      [chars[i], chars[j]] = [chars[j], chars[i]];
    }

    return chars.join("");
  }
}
