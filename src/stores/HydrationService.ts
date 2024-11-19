import type { HydrationState, WithHydration } from "./types";

/**
 * Service class for managing hydration state in Zustand stores
 * Provides utilities for handling store rehydration from persistent storage
 */
export class HydrationService {
  /**
   * Returns the hydration configuration for persist middleware
   * Includes callback to mark store as hydrated after rehydration
   *
   * @template T - Type of the store state
   * @returns Configuration object with onRehydrateStorage callback
   *
   * @example
   * ```typescript
   * export const useStore = create<YourStoreType>()(
   *   persist(
   *     (set) => ({
   *       // Store state
   *     }),
   *     {
   *       ...HydrationService.getHydrationConfig(),
   *       storage: customStorage,
   *     }
   *   )
   * );
   * ```
   */
  static getHydrationConfig<T>() {
    return {
      onRehydrateStorage: (state: WithHydration<T>) => {
        return () => state.setHasHydrated(true);
      },
    };
  }

  /**
   * Returns state object with hydration flag set to true
   * Used to mark store as hydrated
   *
   * @returns Hydration state object with _hasHydrated set to true
   *
   * @example
   * ```typescript
   * setHasHydrated: () => set(() => HydrationService.setStateAsHydrated())
   * ```
   */
  static setStateAsHydrated(): HydrationState {
    return {
      _hasHydrated: true,
    };
  }

  /**
   * Returns initial hydration state
   * Used when initializing store
   *
   * @returns Initial hydration state with _hasHydrated set to false
   *
   * @example
   * ```typescript
   * export const useStore = create()((set) => ({
   *   ...HydrationService.getInitialState(),
   *   // Other initial state
   * }));
   * ```
   */
  static getInitialState(): HydrationState {
    return {
      _hasHydrated: false,
    };
  }
}
