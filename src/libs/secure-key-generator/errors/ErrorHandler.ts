import type { ErrorMessage, ErrorCode } from "./types";

import { errorMessages } from "./constants/errorMessages";
import { GeneratorError } from "./GeneratorError";

/**
 * Handles error creation and processing for password/passphrase generation
 * Provides consistent error handling and logging across the application
 *
 * @class ErrorHandler
 *
 * @example
 * ```typescript
 * try {
 *   // Some generator operation
 * } catch (error) {
 *   ErrorHandler.handle(error);
 * }
 *
 * // Creating a specific error
 * throw ErrorHandler.createError('INVALID_WORD_COUNT', { count: 0 });
 * ```
 */
export class ErrorHandler {
  /**
   * Creates a formatted generator error with optional metadata
   * Supports template string replacement in error messages
   *
   * @param code - Error code corresponding to a predefined message
   * @param metadata - Optional metadata to include in error and replace in message
   * @returns Formatted generator error
   *
   * @example
   * ```typescript
   * // Simple error
   * const error = ErrorHandler.createError('EMPTY_WORD_LIST');
   *
   * // Error with metadata and template replacement
   * const error = ErrorHandler.createError('INVALID_LENGTH', {
   *   min: 8,
   *   max: 128,
   *   current: 4
   * });
   * ```
   */
  public static createError(
    code: ErrorCode,
    metadata?: Record<string, unknown>,
  ): GeneratorError {
    let message = errorMessages[code] as ErrorMessage;

    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        message = message.replace(`{${key}}`, String(value)) as ErrorMessage;
      });
    }

    return new GeneratorError({ metadata, message, code });
  }

  /**
   * Handles and logs errors, providing detailed information for generator errors
   * and basic logging for unexpected errors
   *
   * @param error - Error to handle
   * @throws The original error after logging
   * @never Returns (always throws)
   *
   * @example
   * ```typescript
   * try {
   *   generatePassword(options);
   * } catch (error) {
   *   ErrorHandler.handle(error);
   *   // Logs error details and re-throws
   * }
   * ```
   */
  public static handle(error: unknown): never {
    if (error instanceof GeneratorError) {
      console.error("Password Generator Error:", {
        metadata: error.details.metadata,
        message: error.details.message,
        code: error.details.code,
      });
    } else {
      console.error("Unexpected Error:", error);
    }
    throw error;
  }
}
