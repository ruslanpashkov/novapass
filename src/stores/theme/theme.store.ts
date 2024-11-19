import { persist } from "zustand/middleware";
import { create } from "zustand";

import type { ThemeStore, ThemeState } from "./theme.types";

import { createWxtStorage } from "../persistMiddleware";
import { ThemeService } from "./theme.service";

/**
 * Zustand store for managing theme state and preferences
 * Handles theme persistence, system theme synchronization, and theme toggling
 *
 * @type {ThemeStore}
 *
 * @example
 * ```typescript
 * const { theme, isSystemTheme, setTheme } = useThemeStore();
 *
 * // Set a specific theme
 * setTheme('dark');
 *
 * // Toggle between light and dark
 * useThemeStore.getState().toggleTheme();
 * ```
 */
export const useThemeStore = create<ThemeStore>()(
  persist(
    (set, get) => ({
      // Initialize with default theme state
      ...ThemeService.getInitialState(),

      /**
       * Synchronizes theme with system preferences and sets up theme change listener
       * @returns {() => void} Cleanup function to remove system theme listener
       */
      syncWithSystem: () => {
        // Update theme to match current system preference
        set(() =>
          ThemeService.updateTheme(ThemeService.getSystemTheme(), true),
        );

        // Set up listener for system theme changes
        return ThemeService.setupSystemThemeListener(() => {
          const state = get();
          const update = ThemeService.handleSystemThemeChange(state);

          if (update) {
            set(update);
          }
        });
      },

      /**
       * Toggles between light and dark theme
       * If system theme is enabled, this will disable it
       */
      toggleTheme: () => {
        set((state) => ThemeService.toggleTheme(state));
      },

      /**
       * Sets the theme to a specific value
       * @param theme - Theme to set (usually 'light' or 'dark')
       */
      setTheme: (theme) => {
        set(() => ThemeService.setTheme(theme));
      },
    }),
    {
      /**
       * Specifies which parts of the state should be persisted
       * @param state - Current theme state
       * @returns Partial state containing only persistent values
       */
      partialize: (state) => ({
        isSystemTheme: state.isSystemTheme,
        theme: state.theme,
      }),
      // Use Wxt storage for persistence
      storage: createWxtStorage<ThemeState>(),
      name: "theme-storage",
    },
  ),
);

/**
 * Initialize system theme synchronization when the store is created
 * This ensures the theme stays in sync with system preferences from the start
 */
useThemeStore.getState().syncWithSystem();
