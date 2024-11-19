export interface StartupActions {
  setHasSeenWelcome: (value: boolean) => void;
}

export interface StartupState {
  hasSeenWelcome: boolean;
}

export type StartupStore = StartupActions & StartupState;
