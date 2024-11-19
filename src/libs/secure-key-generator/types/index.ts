/**
 * Available character set categories for password generation
 * @typedef {'lowercase' | 'uppercase' | 'numbers' | 'symbols'} CharacterSet
 */
export type CharacterSet = "lowercase" | "uppercase" | "numbers" | "symbols";

/**
 * Available word casing styles for passphrase generation
 * @typedef {'capitalize' | 'uppercase' | 'lowercase'} WordStyle
 *
 * @example
 * 'capitalize': "Word"
 * 'uppercase':  "WORD"
 * 'lowercase':  "word"
 */
export type WordStyle = "capitalize" | "uppercase" | "lowercase";

/**
 * Additional rules for password generation customization
 * @typedef {'exclude'} AdditionalRule
 */
export type AdditionalRule = "exclude";

/**
 * Toggle options for password generation behavior
 * @typedef {'skipAmbiguous'} SwitchOption
 */
export type SwitchOption = "skipAmbiguous";

/**
 * Configuration for enabling/disabling character sets
 * Maps each character set to a boolean flag
 *
 * @typedef {Record<CharacterSet, boolean>} CharacterSetOptions
 *
 * @example
 * ```typescript
 * const options: CharacterSetOptions = {
 *   lowercase: true,
 *   uppercase: true,
 *   numbers: true,
 *   symbols: false
 * };
 * ```
 */
export type CharacterSetOptions = Record<CharacterSet, boolean>;

/**
 * Additional customization options for password generation
 * Combines character exclusion rules and behavior switches
 *
 * @typedef {Object} CustomizationOptions
 * @property {string} exclude - Characters to exclude from generation
 * @property {boolean} skipAmbiguous - Whether to skip ambiguous characters
 *
 * @example
 * ```typescript
 * const customization: CustomizationOptions = {
 *   exclude: "meow",        // Exclude unwanted characters
 *   skipAmbiguous: true     // Skip ambiguous characters (0, O, 1, l, I)
 * };
 * ```
 */
export type CustomizationOptions = {
  [key in AdditionalRule]: string;
} & {
  [key in SwitchOption]: boolean;
};

/**
 * Complete configuration options for password generation
 *
 * @interface PasswordOptions
 * @extends {CharacterSetOptions}
 *
 * @example
 * ```typescript
 * const options: PasswordOptions = {
 *   lowercase: true,
 *   uppercase: true,
 *   numbers: true,
 *   symbols: false,
 *   length: 16,
 *   customization: {
 *     exclude: "meow",
 *     skipAmbiguous: true
 *   }
 * };
 * ```
 */
export interface PasswordOptions extends CharacterSetOptions {
  /** Additional customization settings */
  customization: CustomizationOptions;
  /** Desired password length */
  length: number;
}

/**
 * Configuration options for passphrase generation
 *
 * @interface PassphraseOptions
 *
 * @example
 * ```typescript
 * const options: PassphraseOptions = {
 *   wordCount: 4,
 *   separator: "-",
 *   style: "lowercase",
 *   includeNumber: true
 * };
 * // Result example: "correct-horse-battery-staple4"
 * ```
 */
export interface PassphraseOptions {
  /** Whether to add a random number to single word */
  includeNumber: boolean;
  /** Number of words to include */
  wordCount: number;
  /** Character(s) to use between words */
  separator: string;
  /** Word casing style */
  style: WordStyle;
}

/**
 * Maps character set categories to their actual characters
 *
 * @typedef {Object} CharacterPool
 *
 * @example
 * ```typescript
 * const pool: CharacterPool = {
 *   lowercase: "abcdefghijklmnopqrstuvwxyz",
 *   uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
 *   numbers: "0123456789",
 *   symbols: "!@#$%^&*"
 * };
 * ```
 */
export type CharacterPool = {
  [K in CharacterSet]: string;
};
