import type { Options } from "@emotion/cache";

import rtlPlugin from "stylis-plugin-rtl";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

import type { Direction } from "@/stores/direction";

/**
 * Creates an Emotion cache configuration with RTL support using stylis plugins
 * Enables right-to-left text direction support for Material-UI components
 *
 * @returns Configured Emotion cache with RTL support
 *
 * @example
 * ```typescript
 * // Create RTL cache provider wrapper
 * function RTL(props: { children: React.ReactNode }) {
 *   return (
 *     <CacheProvider value={createRtlCache()}>
 *       {props.children}
 *     </CacheProvider>
 *   );
 * }
 *
 * // Use with Material-UI for RTL languages
 * <RTL>
 *   <ThemeProvider theme={theme}>
 *     <App />
 *   </ThemeProvider>
 * </RTL>
 * ```
 */
export const createRtlCache = (direction: Direction) => {
  const rtlCache: Options = {
    stylisPlugins: [prefixer, rtlPlugin],
    key: "muirtl",
  };

  const ltrCache: Options = {
    stylisPlugins: [prefixer],
    key: "muiltr",
  };

  const currentCache = direction === "rtl" ? rtlCache : ltrCache;

  return createCache(currentCache);
};
