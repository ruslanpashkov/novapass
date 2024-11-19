import type { ThemeState, Theme } from "./theme.types";

/**
 * Service class for managing theme-related operations and system theme detection
 * Provides functionality for theme switching, system theme sync, and state management
 */
export class ThemeService {
  /**
   * Media query for detecting system color scheme preference
   * @private
   */
  private static mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

  /**
   * Sets up a listener for system theme changes
   * @param onThemeChange - Callback function to handle theme changes
   * @returns Cleanup function to remove the event listener
   *
   * @example
   * ```typescript
   * const cleanup = ThemeService.setupSystemThemeListener((newState) => {
   *   console.log('System theme changed:', newState.theme);
   * });
   *
   * // Later: cleanup();
   * ```
   */
  static setupSystemThemeListener(
    onThemeChange: (state: ThemeState) => void,
  ): () => void {
    const handleChange = () => {
      const state = {
        theme: this.getSystemTheme(),
        isSystemTheme: true,
      };

      onThemeChange(state);
    };

    this.mediaQuery.addEventListener("change", handleChange);

    return () => {
      this.mediaQuery.removeEventListener("change", handleChange);
    };
  }

  /**
   * Handles system theme changes by updating state if system theme sync is enabled
   * @param state - Current theme state
   * @returns Updated state if system theme is enabled, null otherwise
   */
  static handleSystemThemeChange(
    state: ThemeState,
  ): Partial<ThemeState> | null {
    if (!state.isSystemTheme) {
      return null;
    }

    return this.updateTheme(this.getSystemTheme(), true);
  }

  /**
   * Toggles between light and dark themes
   * Automatically disables system theme sync
   * @param state - Current theme state
   * @returns Updated theme state with toggled theme
   */
  static toggleTheme(state: ThemeState): Partial<ThemeState> {
    const nextTheme = this.getNextTheme(state.theme);

    return this.updateTheme(nextTheme, false);
  }

  /**
   * Updates theme state with new theme and system sync preference
   * @param state - Current theme state
   * @param theme - New theme to apply
   * @param isSystemTheme - Whether to sync with system theme
   * @returns Updated theme state
   */
  static updateTheme(theme: Theme, isSystemTheme = false): Partial<ThemeState> {
    return {
      isSystemTheme,
      theme,
    };
  }

  /**
   * Gets initial theme state based on system preferences
   * @returns Initial theme state with system theme sync enabled
   */
  static getInitialState(): ThemeState {
    return {
      theme: this.getSystemTheme(),
      isSystemTheme: true,
    };
  }

  /**
   * Gets the opposite theme of the current theme
   * @param currentTheme - Current theme
   * @returns Opposite theme ('light' -> 'dark' or 'dark' -> 'light')
   */
  static getNextTheme(currentTheme: Theme): Theme {
    return currentTheme === "light" ? "dark" : "light";
  }

  /**
   * Sets a specific theme and disables system theme sync
   * @param state - Current theme state
   * @param theme - Theme to set
   * @returns Updated theme state
   */
  static setTheme(theme: Theme): Partial<ThemeState> {
    return this.updateTheme(theme, false);
  }

  /**
   * Detects current system color scheme preference
   * @returns Current system theme preference
   */
  static getSystemTheme(): Theme {
    return this.mediaQuery.matches ? "dark" : "light";
  }
}
