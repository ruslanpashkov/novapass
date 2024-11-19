export interface ThemeActions {
  setTheme: (theme: Theme) => void;
  syncWithSystem: () => void;
  toggleTheme: () => void;
}

export interface ThemeState {
  isSystemTheme: boolean;
  theme: Theme;
}

export type ThemeStore = ThemeActions & ThemeState;

export type Theme = "light" | "dark";
