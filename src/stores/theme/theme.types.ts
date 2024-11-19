export type Theme = "light" | "dark";

export interface ThemeState {
  isSystemTheme: boolean;
  theme: Theme;
}

export interface ThemeActions {
  setTheme: (theme: Theme) => void;
  syncWithSystem: () => void;
  toggleTheme: () => void;
}

export type ThemeStore = ThemeActions & ThemeState;
