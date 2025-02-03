/**
 * Defines character sets used for password generation
 * Each property represents a distinct category of characters
 *
 * @const {readonly {
 *   symbols: string,
 *   lowercase: string,
 *   uppercase: string,
 *   numbers: string
 * }}
 *
 * @example
 * ```typescript
 * // Using specific character sets
 * const uppercaseOnly = ALLOWED_CHARACTERS.uppercase;
 * // Result: "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
 *
 * // Combining multiple sets
 * const alphanumeric = ALLOWED_CHARACTERS.lowercase +
 *                     ALLOWED_CHARACTERS.uppercase +
 *                     ALLOWED_CHARACTERS.numbers;
 * ```
 */
export const ALLOWED_CHARACTERS = {
  /** Standard English lowercase letters */
  lowercase: "abcdefghijklmnopqrstuvwxyz",

  /** Standard English uppercase letters */
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",

  /** Decimal digits */
  numbers: "0123456789",

  /** Special characters for password complexity */
  symbols: "!@#$%^&*",
} as const;
