import type { HistoryState, Password } from "./history.types";

/**
 * Service class for managing password history operations
 * Handles password creation, storage, retrieval, and removal
 */
export class HistoryService {
  /**
   * Adds a password to history, handling duplicates by moving them to the top
   * @param state - Current history state
   * @param value - Password value to add
   * @returns Updated history state with new password added
   *
   * @example
   * ```typescript
   * const newState = HistoryService.addPassword(currentState, "password123");
   * // Adds password to start of history, removes duplicate if exists
   * ```
   */
  static addPassword(state: HistoryState, value: string): HistoryState {
    const newPassword = this.createPassword(value);
    const existingPassword = this.findByValue(state.passwords, value);

    if (existingPassword) {
      const filteredPasswords = this.removeById(
        state.passwords,
        existingPassword.id,
      );

      return {
        passwords: [newPassword, ...filteredPasswords],
      };
    }

    return {
      passwords: [newPassword, ...state.passwords],
    };
  }

  /**
   * Removes a password from history by its ID
   * @param state - Current history state
   * @param id - ID of password to remove
   * @returns Updated history state with password removed
   */
  static removePassword(state: HistoryState, id: number): HistoryState {
    return {
      ...state,
      passwords: this.removeById(state.passwords, id),
    };
  }

  /**
   * Finds a password record by its value
   * @param passwords - Array of password records to search
   * @param value - Password value to find
   * @returns Matching password record or null if not found
   */
  static findByValue(passwords: Password[], value: string): Password | null {
    return passwords.find((record) => record.value === value) || null;
  }

  /**
   * Creates a new password record with timestamp and unique ID
   * @param value - Password value to store
   * @returns New password record
   *
   * @example
   * ```typescript
   * const password = HistoryService.createPassword("myPassword");
   * // Result: { id: 1234567890, value: "myPassword", createdAt: "2024-..." }
   * ```
   */
  static createPassword(value: string): Password {
    return {
      createdAt: new Date().toISOString(),
      id: Date.now(),
      value,
    };
  }

  /**
   * Filters out a password by its ID
   * @param passwords - Array of password records
   * @param id - ID of password to remove
   * @returns New array with specified password removed
   */
  static removeById(passwords: Password[], id: number): Password[] {
    return passwords.filter((record) => record.id !== id);
  }

  /**
   * Gets initial history state
   * @returns Empty history state
   */
  static getInitialState(): HistoryState {
    return {
      passwords: [],
    };
  }

  /**
   * Clears all passwords from history
   * @returns Empty history state
   */
  static clearHistory(): HistoryState {
    return this.getInitialState();
  }
}
