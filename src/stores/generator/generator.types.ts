import type {
  PassphraseOptions,
  PasswordOptions,
} from "@/libs/secure-key-generator";

export interface GeneratorActions {
  updatePassphraseOptions: (updates: Partial<PassphraseOptions>) => void;
  updatePasswordOptions: (updates: Partial<PasswordOptions>) => void;
  createPassword: (mode: GenerationMode) => string;
  setPassword: (password: string) => void;
  setMode: (mode: GenerationMode) => void;
}

export interface GeneratorState {
  passphraseOptions: PassphraseOptions;
  passwordOptions: PasswordOptions;
  mode: GenerationMode;
  password: string;
}

export type GeneratorStore = GeneratorActions & GeneratorState;

export type GenerationMode = "passphrase" | "password";
