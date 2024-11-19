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
    const chars: string[] = [];

    // Get required characters from each enabled set
    const requiredChars = this.characterPoolService.getRequiredChars(options);

    chars.push(...requiredChars);

    // Fill remaining length with random characters
    while (chars.length < length) {
      chars.push(pool[this.randomGenerator.getRandomNumber(pool.length)]);
    }

    // Randomly shuffle all characters
    this.shuffleArray(chars);

    return chars.join("");
  }

  /**
   * Shuffles array in-place using Fisher-Yates algorithm
   * Uses cryptographically secure random numbers
   *
   * @param array - Array to shuffle
   * @private
   */
  private shuffleArray(array: string[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.randomGenerator.getRandomNumber(i + 1);

      [array[i], array[j]] = [array[j], array[i]];
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
}
