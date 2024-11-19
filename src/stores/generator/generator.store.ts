import { persist } from "zustand/middleware";
import { create } from "zustand";

import type {
  GenerationMode,
  GeneratorState,
  GeneratorStore,
} from "./generator.types";
import type { WithHydration } from "../types";

import { createWxtStorage } from "../persistMiddleware";
import { GeneratorService } from "./generator.service";
import { HydrationService } from "../HydrationService";

/**
 * Zustand store for managing password/passphrase generation state and options
 * Handles persistence of generator preferences and creation of secure passwords
 *
 * @type {GeneratorStore}
 *
 * @example
 * ```typescript
 * const { mode, passwordOptions, createPassword } = useGeneratorStore();
 *
 * // Generate a new password
 * const newPassword = createPassword();
 *
 * // Update password options
 * useGeneratorStore.getState().updatePasswordOptions({ length: 16 });
 * ```
 */
export const useGeneratorStore = create<WithHydration<GeneratorStore>>()(
  persist(
    (set, get) => ({
      // Initialize with default generator state
      ...GeneratorService.getInitialState(),
      ...HydrationService.getInitialState(),

      /**
       * Updates passphrase generation options
       * @param updates - Partial passphrase options to update
       */
      updatePassphraseOptions: (updates) => {
        set((state) =>
          GeneratorService.updatePassphraseOptions(state, updates),
        );
      },

      /**
       * Creates a new password or passphrase based on current options
       * @returns {string} Generated password or passphrase
       */
      createPassword: (mode: GenerationMode) => {
        const state = get();

        return GeneratorService.createPassword(state, mode);
      },

      /**
       * Updates password generation options
       * @param updates - Partial password options to update
       */
      updatePasswordOptions: (updates) => {
        set((state) => GeneratorService.updatePasswordOptions(state, updates));
      },

      /**
       * Sets the hydration status to true
       * Called automatically by persist middleware after rehydration
       */
      setHasHydrated: () => {
        set(() => HydrationService.setStateAsHydrated());
      },

      /**
       * Sets the currently displayed password/passphrase
       * @param value - Password or passphrase to set
       */
      setPassword: (value) => {
        set(() => GeneratorService.setPassword(value));
      },

      /**
       * Sets the generator mode (password or passphrase)
       * @param mode - Mode to set ('password' or 'passphrase')
       */
      setMode: (mode) => {
        set(() => GeneratorService.setMode(mode));
      },
    }),
    {
      /**
       * Specifies which parts of the state should be persisted
       * @param state - Current generator state
       * @returns Partial state containing only persistent values
       */
      partialize: (state) => ({
        passphraseOptions: state.passphraseOptions,
        passwordOptions: state.passwordOptions,
        mode: state.mode,
      }),
      // Use Wxt storage for persistence
      storage: createWxtStorage<Omit<GeneratorState, "password">>(),
      name: "generator-storage",
      ...HydrationService.getHydrationConfig(),
    },
  ),
);
