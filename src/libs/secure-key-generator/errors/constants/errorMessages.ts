/**
 * Error messages for password and passphrase generation
 * Provides consistent error messaging across the application
 *
 * @const {readonly {[key: string]: string}}
 *
 * @example
 * ```typescript
 * throw new Error(errorMessages.MAX_ATTEMPTS_EXCEEDED);
 * ```
 */
export const errorMessages = {
  /**
   * Thrown when password generation fails after maximum attempts
   * Typically occurs when constraints are too strict
   *
   * @example
   * When length is short but all character types are required
   */
  MAX_ATTEMPTS_EXCEEDED:
    "Unable to generate password meeting requirements. Consider relaxing constraints.",

  /**
   * Thrown when character exclusions remove all available characters
   * Occurs when exclusion patterns match entire character pool
   *
   * @example
   * When excluding all numbers from a numbers-only pool
   */
  EMPTY_POOL_AFTER_EXCLUSION:
    "No characters remaining after applying exclusions",

  /**
   * Thrown when password length doesn't meet security requirements
   * Could be too short or too long based on configuration
   */
  INVALID_PASSWORD_LENGTH: "Length must correlate with strict guidelines",

  /**
   * Thrown when attempting to generate from an empty character pool
   * Typically indicates a configuration error
   */
  EMPTY_CHARACTER_POOL: "Character pool cannot be empty",

  /**
   * Thrown when maximum generation attempts is configured incorrectly
   * Value must be greater than zero
   */
  INVALID_MAX_ATTEMPTS: "MAX_ATTEMPTS must be positive",

  /**
   * Thrown when passphrase word count is invalid
   * Must be at least one word
   */
  INVALID_WORD_COUNT: "Word count must be at least 1",

  /**
   * Thrown when word list for passphrase generation is empty
   * Indicates missing or corrupted word list data
   */
  EMPTY_WORD_LIST: "Word list is empty",
} as const;
