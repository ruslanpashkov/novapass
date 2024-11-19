import type { Theme as MaterialTheme } from "@mui/material";
import type { Direction } from "@/stores/direction";
import type { Theme } from "@/stores/theme";

import { createTheme } from "@mui/material";

/**
 * Creates a Material-UI theme object based on the application's theme mode
 * Converts application theme setting into a full Material-UI theme configuration
 *
 * @returns Configured Material-UI theme object
 *
 * @example
 * ```typescript
 * // Create a light theme
 * const lightTheme = createAppTheme('light');
 *
 * // Create a dark theme
 * const darkTheme = createAppTheme('dark');
 *
 * // Use with Material-UI ThemeProvider
 * <ThemeProvider theme={createAppTheme(currentTheme)}>
 *   <App />
 * </ThemeProvider>
 * ```
 */
export const createAppTheme = (
  mode: Theme,
  direction: Direction,
): MaterialTheme =>
  createTheme({
    palette: { mode },
    direction,
  });
