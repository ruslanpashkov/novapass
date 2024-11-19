import type { ZxcvbnResult, Options } from "@zxcvbn-ts/core";

/**
 * Configuration options for password strength checker
 * Extends zxcvbn options to allow partial configuration
 *
 * @typedef {Partial<Options>} StrengthCheckerOptions
 *
 * @example
 * ```typescript
 * const options: StrengthCheckerOptions = {
 *   dictionary: {
 *     // Custom dictionaries for pattern matching
 *     commonWords: ["password", "qwerty"]
 *   },
 *   translations: {
 *     // Custom warning messages
 *     warnings: { straightRow: "Avoid keyboard patterns" }
 *   }
 * };
 * ```
 */
export type StrengthCheckerOptions = Partial<Options>;

/**
 * Result of password strength analysis
 * Contains detailed feedback about password strength
 *
 * @typedef {ZxcvbnResult} Result
 *
 * @example
 * ```typescript
 * const result: Result = {
 *   score: 3,              // Score from 0-4
 *   guessesLog10: 10,     // Estimated guesses (log10)
 *   feedback: {
 *     warning: string,     // Primary warning message
 *     suggestions: string[] // Improvement suggestions
 *   },
 *   // ... additional zxcvbn result properties
 * };
 * ```
 */
export type Result = ZxcvbnResult;

/**
 * Interface for password strength checker implementations
 * Defines required methods for analyzing password strength
 *
 * @interface StrengthChecker
 *
 * @example
 * ```typescript
 * class CustomChecker implements StrengthChecker {
 *   async initialize(): Promise<void> {
 *     // Load necessary resources
 *   }
 *
 *   async checkStrength(password: string): Promise<Result> {
 *     // Analyze password strength
 *     return analysis;
 *   }
 * }
 * ```
 */
export interface StrengthChecker {
  /**
   * Analyzes the strength of a given password
   * @param password - Password to analyze
   * @returns Promise resolving to detailed strength analysis
   */
  checkStrength(password: string): Promise<Result>;

  /**
   * Initializes the strength checker with required resources
   * @returns Promise resolving when initialization is complete
   */
  initialize(): Promise<void>;
}
