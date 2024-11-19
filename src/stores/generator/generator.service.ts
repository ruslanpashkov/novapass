import {
  type PassphraseOptions,
  type PasswordOptions,
  passphraseGenerator,
  passwordGenerator,
} from "@/libs/secure-key-generator";

import type { GenerationMode, GeneratorState } from "./generator.types";

/**
 * Service class for managing password and passphrase generation
 * Handles generation options, state management, and generation logic
 */
export class GeneratorService {
  /**
   * Gets default password generation options
   * @returns Initial password configuration with secure defaults
   */
  static getInitialPasswordOptions(): PasswordOptions {
    return {
      customization: {
        skipAmbiguous: false,
        exclude: "",
      },
      uppercase: true,
      lowercase: true,
      symbols: false,
      numbers: true,
      length: 24,
    };
  }

  /**
   * Updates passphrase generation options
   * @param state - Current generator state
   * @param updates - Partial passphrase options to update
   * @returns Updated generator state
   *
   * @example
   * ```typescript
   * const newState = GeneratorService.updatePassphraseOptions(state, {
   *   wordCount: 5,
   *   separator: "_"
   * });
   * ```
   */
  static updatePassphraseOptions(
    state: GeneratorState,
    updates: Partial<PassphraseOptions>,
  ): Partial<GeneratorState> {
    return {
      passphraseOptions: {
        ...state.passphraseOptions,
        ...updates,
      },
    };
  }

  /**
   * Updates password generation options
   * @param state - Current generator state
   * @param updates - Partial password options to update
   * @returns Updated generator state
   *
   * @example
   * ```typescript
   * const newState = GeneratorService.updatePasswordOptions(state, {
   *   length: 32,
   *   symbols: true
   * });
   * ```
   */
  static updatePasswordOptions(
    state: GeneratorState,
    updates: Partial<PasswordOptions>,
  ): Partial<GeneratorState> {
    return {
      passwordOptions: {
        ...state.passwordOptions,
        ...updates,
      },
    };
  }

  /**
   * Gets initial generator state with default options
   * @returns Default generator state
   */
  static getInitialState(): GeneratorState {
    return {
      passphraseOptions: this.getInitialPassphraseOptions(),
      passwordOptions: this.getInitialPasswordOptions(),
      mode: "password",
      password: "",
    };
  }

  /**
   * Generates password or passphrase based on mode
   * @param state - Current generator state
   * @param mode - Generation mode (password/passphrase)
   * @returns Generated password or passphrase
   */
  static generate(state: GeneratorState, mode: GenerationMode): string {
    return mode === "passphrase"
      ? this.generatePassphrase(state.passphraseOptions)
      : this.generatePassword(state.passwordOptions);
  }

  /**
   * Gets default passphrase generation options
   * @returns Initial passphrase configuration
   */
  static getInitialPassphraseOptions(): PassphraseOptions {
    return {
      includeNumber: false,
      style: "lowercase",
      separator: "-",
      wordCount: 4,
    };
  }

  /**
   * Generates a passphrase using configured options
   * @param passphraseOptions - Passphrase generation options
   * @returns Generated passphrase
   */
  static generatePassphrase(passphraseOptions: PassphraseOptions): string {
    return passphraseGenerator.generatePassphrase(passphraseOptions);
  }

  /**
   * Generates a password using configured options
   * @param passwordOptions - Password generation options
   * @returns Generated password
   */
  static generatePassword(passwordOptions: PasswordOptions): string {
    return passwordGenerator.generatePassword(passwordOptions);
  }

  /**
   * Creates a new password/passphrase using current state and mode
   * @param state - Current generator state
   * @param mode - Generation mode (password/passphrase)
   * @returns Generated password or passphrase
   */
  static createPassword(state: GeneratorState, mode: GenerationMode): string {
    return this.generate(state, mode);
  }

  /**
   * Updates the current password value
   * @param state - Current generator state
   * @param value - New password value
   * @returns Updated generator state
   */
  static setPassword(value: string): Partial<GeneratorState> {
    return {
      password: value,
    };
  }

  /**
   * Updates the generation mode
   * @param state - Current generator state
   * @param mode - New generation mode
   * @returns Updated generator state
   */
  static setMode(mode: GenerationMode): Partial<GeneratorState> {
    return {
      mode,
    };
  }
}
