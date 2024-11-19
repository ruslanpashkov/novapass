export interface StartupState {
  hasSeenWelcome: boolean;
}

export interface StartupActions {
  setHasSeenWelcome: (value: boolean) => void;
}

export type StartupStore = StartupActions & StartupState;
