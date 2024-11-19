import type { PersistStorage, StorageValue } from "zustand/middleware";

import { storage } from "wxt/storage";

/**
 * Creates a typed storage adapter for Zustand persist middleware using WXT storage
 *
 * @template T - Type of the state to be stored
 * @returns {PersistStorage<T>} Storage adapter compatible with Zustand persist middleware
 *
 * @example
 * ```typescript
 * const store = create(
 *   persist(
 *     (set) => ({
 *       // store state
 *     }),
 *     {
 *       name: 'my-store',
 *       storage: createWxtStorage<MyState>()
 *     }
 *   )
 * );
 * ```
 */
export const createWxtStorage = <T>(): PersistStorage<T> => ({
  /**
   * Retrieves and deserializes stored state
   * @param name - Key of the state to retrieve
   * @returns Promise resolving to the deserialized state or null if not found/error
   */
  getItem: async (name): Promise<StorageValue<T> | null> => {
    try {
      const value = await storage.getItem<StorageValue<T>>(`local:${name}`);

      return value ?? null;
    } catch (error: unknown) {
      console.error("Error reading from storage:", error);

      return null;
    }
  },

  /**
   * Serializes and stores state
   * @param name - Key under which to store the state
   * @param value - State to store
   */
  setItem: async (name, value: StorageValue<T>): Promise<void> => {
    try {
      await storage.setItem(`local:${name}`, value);
    } catch (error: unknown) {
      console.error("Error writing to storage:", error);
    }
  },

  /**
   * Removes stored state
   * @param name - Key of the state to remove
   */
  removeItem: async (name): Promise<void> => {
    try {
      await storage.removeItem(`local:${name}`);
    } catch (error: unknown) {
      console.error("Error removing from storage:", error);
    }
  },
});

// Optional: Define commonly used storage items
export const defineStorageItem = <T>(key: string, defaultValue: T) =>
  storage.defineItem<T>(`local:${key}`, {
    fallback: defaultValue,
  });
