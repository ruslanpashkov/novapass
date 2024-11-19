import type { ErrorDetails } from "./types";

/**
 * Custom error class for password/passphrase generation errors
 * Extends standard Error with additional details and metadata
 *
 * @class GeneratorError
 * @extends Error
 *
 * @example
 * ```typescript
 * throw new GeneratorError({
 *   code: 'INVALID_WORD_COUNT',
 *   message: 'Word count must be at least 1',
 *   metadata: { provided: 0 }
 * });
 * ```
 */
export class GeneratorError extends Error {
  /**
   * Creates a new generator error with detailed information
   * @param details - Error details including code, message, and optional metadata
   */
  constructor(public readonly details: ErrorDetails) {
    super(details.message);
    this.name = "PasswordGeneratorError";
  }
}
