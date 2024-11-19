import { zxcvbnOptions, zxcvbn } from "@zxcvbn-ts/core";

import type { StrengthCheckerOptions, Result } from "../types";

import { BaseStrengthChecker } from "./StrengthChecker";

/**
 * Implementation of password strength checking using the zxcvbn algorithm
 * Provides robust password strength analysis with multi-language support
 *
 * @extends BaseStrengthChecker
 *
 * @example
 * ```typescript
 * const checker = new ZxcvbnStrengthChecker();
 *
 * // Checker will auto-initialize on first use
 * const result = await checker.checkStrength("mypassword");
 * console.log(`Password strength score: ${result.score}`);
 * ```
 */
export class ZxcvbnStrengthChecker extends BaseStrengthChecker {
  /**
   * Initializes the zxcvbn checker with required dictionaries and configurations
   * Implements the abstract initialize method from BaseStrengthChecker
   *
   * @public
   * @returns Promise that resolves when initialization is complete
   * @throws Error if initialization fails
   */
  public async initialize(): Promise<void> {
    if (!this.initialized) {
      try {
        const options = await this.loadOptions();

        zxcvbnOptions.setOptions(options);
        this.initialized = true;
      } catch (error) {
        console.error("Failed to initialize password strength checker:", error);
        throw error;
      }
    }
  }

  /**
   * Analyzes password strength using the zxcvbn algorithm
   * Implements the abstract checkStrength method from BaseStrengthChecker
   *
   * @public
   * @param password - Password to analyze
   * @returns Promise resolving to detailed strength analysis result
   *
   * @example
   * ```typescript
   * const result = await checker.checkStrength("correcthorsebatterystaple");
   * // Result includes:
   * // - score (0-4)
   * // - crack time estimations
   * // - feedback and suggestions
   * ```
   */
  public async checkStrength(password: string): Promise<Result> {
    await this.ensureInitialized();

    return zxcvbn(password);
  }

  /**
   * Loads required dictionaries and configuration for zxcvbn
   * Fetches both common patterns and English language specifics
   *
   * @private
   * @returns Promise resolving to strength checker options
   *
   * @remarks
   * - Loads dictionaries asynchronously for better initial load performance
   * - Combines common patterns with language-specific patterns
   * - Currently includes English language support
   */
  private async loadOptions(): Promise<StrengthCheckerOptions> {
    const [zxcvbnCommonPackage, zxcvbnEnPackage] = await Promise.all([
      import("@zxcvbn-ts/language-common"),
      import("@zxcvbn-ts/language-en"),
    ]);

    return {
      dictionary: {
        ...zxcvbnCommonPackage.dictionary,
        ...zxcvbnEnPackage.dictionary,
      },
      graphs: zxcvbnCommonPackage.adjacencyGraphs,
      translations: zxcvbnEnPackage.translations,
    };
  }
}
