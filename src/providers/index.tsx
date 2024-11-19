import { type ReactNode, type FC } from "react";

import { ThemeProvider } from "./theme";
import { CacheProvider } from "./cache";

/**
 * Props for the AppProviders component
 * @interface AppProvidersProps
 */
interface AppProvidersProps {
  /** Child components to be wrapped with providers */
  children: ReactNode;
}

/**
 * Root provider component that wraps the application with necessary context providers
 * Currently includes theme management
 *
 * @component
 * @example
 * ```tsx
 * // Wrap your app with providers
 * const App = () => (
 *   <AppProviders>
 *     <YourApp />
 *   </AppProviders>
 * );
 *
 * // Access theme context in child components
 * const ChildComponent = () => {
 *   // Theme context is now available
 *   return <div>Your component content</div>;
 * };
 * ```
 */
export const AppProviders: FC<AppProvidersProps> = ({ children }) => (
  <CacheProvider>
    <ThemeProvider>{children}</ThemeProvider>
  </CacheProvider>
);
