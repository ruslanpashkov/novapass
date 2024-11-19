/**
 * Password and passphrase generation module
 * Provides functionality for generating secure passwords and memorable passphrases
 *
 * @module secure-key-generator
 */

export * from "./services/passphrase/PassphraseGeneratorService";
export * from "./services/password/PasswordGeneratorService";
export * from "./factories/GeneratorFactory";
export * from "./types";

import { GeneratorFactory } from "./factories/GeneratorFactory";

/**
 * Pre-initialized generator instances for passwords and passphrases
 * Created when the module is first imported
 *
 * @example
 * ```typescript
 * import { passwordGenerator, passphraseGenerator } from './secure-key-generator';
 *
 * // Generate a secure password
 * const password = await passwordGenerator.generatePassword({
 *   length: 16,
 *   uppercase: true,
 *   symbols: true
 * });
 *
 * // Generate a memorable passphrase
 * const passphrase = await passphraseGenerator.generatePassphrase({
 *   wordCount: 4,
 *   separator: '-',
 *   style: 'lowercase'
 * });
 * ```
 *
 * @throws {Error} If generator initialization fails
 */
export const { passphraseGenerator, passwordGenerator } = (() => {
  try {
    return {
      passphraseGenerator: GeneratorFactory.createPassphraseGenerator(),
      passwordGenerator: GeneratorFactory.createPasswordGenerator(),
    };
  } catch (error) {
    console.error("Failed to initialize generators:", error);
    throw error;
  }
})();

/**
 * @fileoverview
 * This module provides comprehensive password and passphrase generation:
 *
 * Password Generator:
 * - Configurable character sets (uppercase, lowercase, symbols, numbers)
 * - Custom length support
 * - Customizable character exclusions
 *
 * Passphrase Generator:
 * - Based on EFF word list
 * - Configurable word count
 * - Multiple word styles (lowercase, uppercase, capitalize)
 * - Custom separator support
 *
 * Features:
 * - Pre-initialized generators ready to use
 * - Factory for creating additional generator instances
 * - Complete type definitions for configuration
 * - Built-in security best practices
 *
 * The module automatically initializes default generator instances
 * which are ready to use upon import. It also exports all necessary
 * types and classes for custom implementations.
 */
