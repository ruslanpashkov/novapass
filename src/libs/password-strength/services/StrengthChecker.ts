import type { StrengthChecker, Result } from "../types";

/**
 * Abstract base class for password strength checkers
 * Provides initialization handling and common infrastructure for strength checking implementations
 *
 * @abstract
 * @implements {StrengthChecker}
 *
 * @example
 * ```typescript
 * class CustomStrengthChecker extends BaseStrengthChecker {
 *   async initialize(): Promise<void> {
 *     // Load required resources
 *     await loadResources();
 *   }
 *
 *   async checkStrength(password: string): Promise<Result> {
 *     await this.ensureInitialized();
 *     // Implement strength checking logic
 *     return analyzePassword(password);
 *   }
 * }
 * ```
 */
export abstract class BaseStrengthChecker implements StrengthChecker {
  /**
   * Promise tracking the initialization status
   * Null when not initialized or initialization failed
   * @protected
   */
  protected initializationPromise: Promise<void> | null = null;

  /**
   * Flag indicating whether initialization is complete
   * @protected
   */
  protected initialized = false;

  /**
   * Checks the strength of a password
   * Must be implemented by concrete classes
   *
   * @abstract
   * @param password - Password to analyze
   * @returns Promise resolving to strength analysis result
   */
  abstract checkStrength(password: string): Promise<Result>;

  /**
   * Initializes the strength checker
   * Must be implemented by concrete classes
   *
   * @abstract
   * @returns Promise that resolves when initialization is complete
   */
  abstract initialize(): Promise<void>;

  /**
   * Ensures the checker is initialized before use
   * Handles initialization lifecycle and error cases
   *
   * @protected
   * @returns Promise that resolves when initialization is complete
   * @throws Error if initialization fails
   *
   * @remarks
   * - Only initializes once, subsequent calls return the same promise
   * - Resets initialization promise on failure for retry capability
   * - Logs initialization failures to console
   */
  protected ensureInitialized(): Promise<void> {
    if (!this.initializationPromise) {
      this.initializationPromise = this.initialize().catch((error) => {
        this.initializationPromise = null;
        console.error("Failed to initialize strength checker:", error);
        throw error;
      });
    }

    return this.initializationPromise;
  }
}
