import { ThemeProvider as MaterialThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import { type FC, useMemo } from "react";

import { useDirectionStore } from "@/stores";
import { useThemeStore } from "@/stores";

import type { ThemeProviderProps } from "./theme.types";

import { createAppTheme } from "./theme.utils";

/**
 * Theme provider component that integrates Material-UI theming with application state
 * Automatically updates theme based on application theme store and applies global styles
 *
 * @component
 * @example
 * ```tsx
 * // Wrap your app or component tree
 * const App = () => (
 *   <ThemeProvider>
 *     <YourComponents />
 *   </ThemeProvider>
 * );
 *
 * // Theme will automatically update when store changes
 * const Component = () => {
 *   const setTheme = useThemeStore(state => state.setTheme);
 *   return (
 *     <button onClick={() => setTheme('dark')}>
 *       Switch to Dark Mode
 *     </button>
 *   );
 * };
 * ```
 */
export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const theme = useThemeStore((state) => state.theme);
  const direction = useDirectionStore((state) => state.direction);

  /**
   * Memoized theme object created from current theme value
   * Only recreates when theme changes to avoid unnecessary renders
   */
  const currentTheme = useMemo(
    () => createAppTheme(theme, direction),
    [theme, direction],
  );

  return (
    <MaterialThemeProvider theme={currentTheme}>
      {/* CssBaseline normalizes browser styles and applies theme defaults */}
      <CssBaseline />
      {children}
    </MaterialThemeProvider>
  );
};
