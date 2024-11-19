import type { ReactNode, FC } from "react";

import { useGeneratorStore, useHistoryStore, useStartupStore } from "@/stores";

/**
 * Props for the HydrationGuard component
 * @interface HydrationGuardProps
 * @property {ReactNode} children - Child components to render once stores are hydrated
 */
interface HydrationGuardProps {
  children: ReactNode;
}

/**
 * HydrationGuard ensures that all required Zustand stores are hydrated before rendering children.
 * This prevents hydration mismatches and ensures consistent state management across the application.
 *
 * @component
 * @example
 * ```tsx
 * <HydrationGuard>
 *   <App />
 * </HydrationGuard>
 * ```
 *
 * If any store is not yet hydrated, it returns null to prevent premature rendering.
 */
export const HydrationGuard: FC<HydrationGuardProps> = ({ children }) => {
  const isGeneratorReady = useGeneratorStore((state) => state._hasHydrated);
  const isHistoryReady = useHistoryStore((state) => state._hasHydrated);
  const isStartupReady = useStartupStore((state) => state._hasHydrated);

  if (!isGeneratorReady || !isHistoryReady || !isStartupReady) {
    return null;
  }

  return <>{children}</>;
};
