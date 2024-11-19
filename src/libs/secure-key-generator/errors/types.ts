import type { errorMessages } from "./constants/errorMessages";

/**
 * Valid error codes corresponding to predefined error messages
 * Derived from keys of errorMessages constant
 *
 * @typedef {keyof typeof errorMessages} ErrorCode
 *
 * @example
 * ```typescript
 * const code: ErrorCode = 'INVALID_PASSWORD_LENGTH';
 * ```
 */
export type ErrorCode = keyof typeof errorMessages;

/**
 * Predefined error message strings
 * Derived from values of errorMessages constant
 *
 * @typedef {(typeof errorMessages)[ErrorCode]} ErrorMessage
 *
 * @example
 * ```typescript
 * const message: ErrorMessage = "Length must correlate with strict guidelines";
 * ```
 */
export type ErrorMessage = (typeof errorMessages)[ErrorCode];

/**
 * Structured error information for generator errors
 * Combines error code, message, and optional metadata
 *
 * @interface ErrorDetails
 *
 * @example
 * ```typescript
 * const details: ErrorDetails = {
 *   code: 'INVALID_PASSWORD_LENGTH',
 *   message: 'Length must correlate with strict guidelines',
 *   metadata: {
 *     minLength: 8,
 *     maxLength: 128,
 *     providedLength: 4
 *   }
 * };
 * ```
 */
export interface ErrorDetails {
  /** Additional contextual information about the error */
  metadata?: Record<string, unknown>;
  /** Error code identifying the type of error */
  code: ErrorCode;
  /** Human-readable error message */
  message: string;
}
