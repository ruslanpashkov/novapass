import { CacheProvider as EmotionCacheProvider } from "@emotion/react";
import { type FC, useMemo } from "react";

import { useDirectionStore } from "@/stores";

import type { CacheProviderProps } from "./cache.types";

import { createRtlCache } from "./cache.utils";

/**
 * RTL Cache provider component that enables right-to-left support for Material-UI components
 * Automatically manages Emotion cache for RTL languages and integrates with theme direction
 *
 * @component
 * @example
 * ```tsx *
 * const AppWithLanguage = () => {
 *   const isRtl = useLanguageStore(state => state.isRtl);
 *   return isRtl ? (
 *     <CacheProvider>
 *       <App />
 *     </CacheProvider>
 *   ) : (
 *     <App />
 *   );
 * };
 * ```
 */
export const CacheProvider: FC<CacheProviderProps> = ({ children }) => {
  const direction = useDirectionStore((state) => state.direction);

  /**
   * Memoized RTL cache instance
   * Only creates new cache once to avoid unnecessary recreations
   */
  const cache = useMemo(() => createRtlCache(direction), [direction]);

  return <EmotionCacheProvider value={cache}>{children}</EmotionCacheProvider>;
};
