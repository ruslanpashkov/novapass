import { i18n } from "#i18n";

import type { CheckboxData, SelectEntry } from "../types/control.types";

/**
 * Default checkbox options for password character inclusion settings
 * Defines which character types can be included in generated passwords
 *
 * @const {readonly CheckboxData[]}
 *
 * @example
 * ```typescript
 * // Access default checkbox state
 * const uppercaseDefault = CHECKBOX_OPTIONS.find(opt => opt.id === 'uppercase');
 * console.log(uppercaseDefault.checked); // true
 * ```
 */
export const CHECKBOX_OPTIONS: CheckboxData[] = [
  /** Enable uppercase letters (A-Z) in password */
  {
    label: i18n.t("password.options.uppercase"),
    id: "uppercase",
    checked: true,
  },
  /** Enable lowercase letters (a-z) in password */
  {
    label: i18n.t("password.options.lowercase"),
    id: "lowercase",
    checked: true,
  },
  /** Enable numbers (0-9) in password */
  { label: i18n.t("password.options.numbers"), id: "numbers", checked: true },
  /** Enable special characters in password */
  {
    label: i18n.t("password.options.symbols"),
    checked: false,
    id: "symbols",
  },
] as const;

/**
 * Available word case styles for passphrase generation
 * Defines how words in generated passphrases should be formatted
 *
 * @const {readonly SelectEntry[]}
 *
 * @example
 * ```typescript
 * // Using with a select component
 * <select>
 *   {SELECT_OPTIONS.map(option => (
 *     <option key={option.id} value={option.value}>
 *       {option.label}
 *     </option>
 *   ))}
 * </select>
 * ```
 */
export const SELECT_OPTIONS: SelectEntry[] = [
  /** All characters lowercase (e.g., "word") */
  {
    label: i18n.t("passphrase.style.lowercase"),
    value: "lowercase",
    id: "lowercase",
  },
  /** All characters uppercase (e.g., "WORD") */
  {
    label: i18n.t("passphrase.style.uppercase"),
    value: "uppercase",
    id: "uppercase",
  },
  /** First character uppercase (e.g., "Word") */
  {
    label: i18n.t("passphrase.style.capitalize"),
    value: "capitalize",
    id: "capitalize",
  },
] as const;
