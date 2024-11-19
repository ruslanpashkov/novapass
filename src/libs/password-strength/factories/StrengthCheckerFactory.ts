import type { StrengthChecker } from "../types";

import { ZxcvbnStrengthChecker } from "../services/ZxcvbnStrengthChecker";

/**
 * Factory class for creating password strength checker instances
 * Currently implements zxcvbn algorithm for password strength analysis
 *
 * @class StrengthCheckerFactory
 *
 * @example
 * ```typescript
 * // Create a strength checker
 * const checker = StrengthCheckerFactory.createStrengthChecker();
 *
 * // Use checker to analyze password
 * const result = await checker.checkStrength("mypassword");
 * ```
 */
export class StrengthCheckerFactory {
  /**
   * Creates a new instance of password strength checker
   * Currently returns ZxcvbnStrengthChecker implementation
   *
   * @returns {StrengthChecker} Instance of password strength checker
   *
   * @remarks
   * Factory method allows for future expansion to different strength checking algorithms
   * while maintaining a consistent interface for the application
   */
  public static createStrengthChecker(): StrengthChecker {
    return new ZxcvbnStrengthChecker();
  }
}
