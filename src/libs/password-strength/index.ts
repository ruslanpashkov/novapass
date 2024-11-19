/**
 * Password strength checking module
 * Provides functionality for analyzing password strength using zxcvbn algorithm
 *
 * @module password-strength
 */

export * from "./factories/StrengthCheckerFactory";
export * from "./services/ZxcvbnStrengthChecker";
export * from "./types";

import { StrengthCheckerFactory } from "./factories/StrengthCheckerFactory";

/**
 * Pre-initialized strength checker instance
 * Created when the module is first imported
 *
 * @example
 * ```typescript
 * import { strengthChecker } from './password-strength';
 *
 * // Use the pre-initialized checker
 * const result = await strengthChecker.checkStrength('mypassword');
 * console.log(`Password strength: ${result.score}/4`);
 *
 * // No need to manually initialize - it's handled during import
 * ```
 *
 * @throws {Error} If strength checker initialization fails
 */
export const { strengthChecker } = (() => {
  try {
    return {
      strengthChecker: StrengthCheckerFactory.createStrengthChecker(),
    };
  } catch (error) {
    console.error("Failed to initialize strength checker:", error);
    throw error;
  }
})();

/**
 * @fileoverview
 * This module provides a comprehensive password strength checking solution:
 *
 * - Pre-initialized strength checker instance
 * - Factory for creating additional checkers if needed
 * - Type definitions for strength checking
 * - Zxcvbn implementation of strength checking
 *
 * The module automatically initializes a default strength checker
 * instance which is ready to use upon import. It also exports all
 * necessary types and classes for custom implementations.
 */
