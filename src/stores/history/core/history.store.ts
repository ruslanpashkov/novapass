import { persist } from "zustand/middleware";
import { create } from "zustand";

import type { HistoryState, HistoryStore } from "./history.types";

import { createWxtStorage } from "../../persistMiddleware";
import { HistoryService } from "./history.service";

/**
 * Zustand store for managing password generation history
 * Handles persistence, addition, removal, and clearing of password history
 *
 * @type {HistoryStore}
 *
 * @example
 * ```typescript
 * const { passwords, addPassword, removePassword, clearHistory } = useHistoryStore();
 *
 * // Add new password to history
 * addPassword('generated-password-123');
 *
 * // Remove specific password
 * removePassword('password-id');
 *
 * // Clear entire history
 * clearHistory();
 *
 * // Access password history
 * console.log(passwords);
 * ```
 */
export const useHistoryStore = create<HistoryStore>()(
  persist(
    (set) => ({
      // Initialize with default history state
      ...HistoryService.getInitialState(),

      /**
       * Adds a new password to the history
       * @param password - Password to add to history
       */
      addPassword: (password) => {
        set((state) => HistoryService.addPassword(state, password));
      },

      /**
       * Removes a password from history by its ID
       * @param id - ID of the password to remove
       */
      removePassword: (id) => {
        set((state) => HistoryService.removePassword(state, id));
      },

      /**
       * Clears entire password history
       * Resets to initial empty state
       */
      clearHistory: () => {
        set(HistoryService.clearHistory());
      },
    }),
    {
      /**
       * Specifies which parts of the state should be persisted
       * @param state - Current history state
       * @returns Partial state containing only the passwords array
       */
      partialize: (state) => ({
        passwords: state.passwords,
      }),
      // Use Wxt storage for persistence
      storage: createWxtStorage<HistoryState>(),
      name: "history-storage",
    },
  ),
);
