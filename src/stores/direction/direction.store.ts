import { persist } from "zustand/middleware";
import { create } from "zustand";

import type { DirectionState, DirectionStore } from "./direction.types";

import { createWxtStorage } from "../persistMiddleware";
import { DirectionService } from "./direction.service";

/**
 * Zustand store for managing RTL/LTR direction state
 * Handles persistence of direction preference and automatic direction detection
 *
 * @type {DirectionStore}
 *
 * @example
 * ```typescript
 * const { direction, setDirection } = useDirectionStore();
 *
 * // Update direction manually
 * useDirectionStore.getState().setDirection('rtl');
 *
 * // Initialize direction based on browser language
 * useDirectionStore.getState().initializeDirection();
 * ```
 */
export const useDirectionStore = create<DirectionStore>()(
  persist(
    (set) => ({
      // Initialize with default direction state
      ...DirectionService.getInitialState(),

      /**
       * Initializes direction based on browser language
       */
      initializeDirection: async () => {
        const direction = await DirectionService.detectDirection();

        set((state) => DirectionService.setDirection(state, direction));
      },

      /**
       * Sets the current direction and updates HTML dir attribute
       * @param direction - Direction to set ('ltr' or 'rtl')
       */
      setDirection: (direction) => {
        set((state) => DirectionService.setDirection(state, direction));
      },
    }),
    {
      /**
       * Specifies which parts of the state should be persisted
       * @param state - Current direction state
       * @returns Partial state containing only persistent values
       */
      partialize: (state) => ({
        direction: state.direction,
      }),
      // Use Wxt storage for persistence
      storage: createWxtStorage<DirectionState>(),
      name: "direction-storage",
    },
  ),
);

/**
 * Initialize browser language direction detection when the store is created
 * This ensures the direction stays in sync with browser language from the start
 */
useDirectionStore.getState().initializeDirection();
