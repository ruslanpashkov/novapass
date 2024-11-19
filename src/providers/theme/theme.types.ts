import type { Theme } from "@/stores/theme";
import type { ReactNode } from "react";

/**
 * Theme state and actions for managing application theme
 * @interface ThemeState
 */
export interface ThemeState {
  /** Sets theme to a specific value (light/dark) */
  setTheme: (theme: Theme) => void;

  /** Toggles between light and dark themes */
  toggleTheme: () => void;

  /** Current theme value */
  theme: Theme;
}

/**
 * Props for ThemeProvider component
 * @interface ThemeProviderProps
 *
 * @example
 * ```tsx
 * // With default theme
 * <ThemeProvider defaultTheme="dark">
 *   <App />
 * </ThemeProvider>
 *
 * // Without default theme (uses system preference)
 * <ThemeProvider>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export interface ThemeProviderProps {
  /** Optional default theme to use (falls back to system preference if not provided) */
  defaultTheme?: Theme;

  /** Child components to be wrapped with theme context */
  children: ReactNode;
}
