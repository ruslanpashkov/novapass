import { persist } from "zustand/middleware";
import { create } from "zustand";

import type { StartupState, StartupStore } from "./startup.types";

import { createWxtStorage } from "../persistMiddleware";
import { StartupService } from "./startup.service";

/**
 * Zustand store for managing application startup state
 * Handles persistence of welcome screen status and related startup flags
 *
 * @type {StartupStore}
 *
 * @example
 * ```typescript
 * const { hasSeenWelcome, setHasSeenWelcome } = useStartupStore();
 *
 * // Mark welcome screen as viewed
 * setHasSeenWelcome(true);
 *
 * // Check if welcome screen has been viewed
 * if (!hasSeenWelcome) {
 *   // Show welcome screen
 * }
 * ```
 */
export const useStartupStore = create<StartupStore>()(
  persist(
    (set) => ({
      // Initialize with default startup state
      ...StartupService.getInitialState(),

      /**
       * Updates the welcome screen viewed status
       * @param value - Boolean indicating whether welcome screen has been viewed
       */
      setHasSeenWelcome: (value) => {
        set(() => StartupService.updateStatus(value));
      },
    }),
    {
      /**
       * Specifies which parts of the state should be persisted
       * @param state - Current startup state
       * @returns Partial state containing only persistent values
       */
      partialize: (state) => ({
        hasSeenWelcome: state.hasSeenWelcome,
      }),
      // Use Wxt storage for persistence
      storage: createWxtStorage<StartupState>(),
      name: "startup-storage",
    },
  ),
);
