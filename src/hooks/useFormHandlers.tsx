import { i18n } from "#i18n";

import type {
  PassphraseOptions,
  PasswordOptions,
  WordStyle,
} from "@/libs/secure-key-generator";
import type { GenerationMode } from "@/stores/generator";

import { useGeneratorStore, useAlertStore } from "@/stores";

/**
 * Represents the state and handlers for password/passphrase generation form
 * @interface FormHandlerState
 */
export interface FormHandlerState {
  /** Handles form submission event for generating new password */
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  /** Updates checkbox state for password generation options */
  handleCheckboxChange: (key: string, checked: boolean) => void;
  /** Copies generated password to clipboard */
  handleCopyPassword: (password: string) => Promise<void>;
  /** Toggles skipping ambiguous characters in password generation */
  handleSkipAmbiguousChange: (checked: boolean) => void;
  /** Toggles including numbers in passphrase generation */
  handleIncludeNumberChange: (checked: boolean) => void;
  /** Updates separator used between words in passphrase */
  handleSeparatorChange: (separator: string) => void;
  /** Updates word style (case format) in passphrase */
  handleWordStyleChange: (style: WordStyle) => void;
  /** Updates number of words in passphrase */
  handleWordCountChange: (count: number) => void;
  /** Updates characters to exclude from password generation */
  handleExcludeChange: (value: string) => void;
  /** Updates password length */
  handleLengthChange: (length: number) => void;
}

/**
 * Base interface for form command pattern implementation
 * @interface FormCommand
 * @template T - Type of command arguments
 */
interface FormCommand<T> {
  execute(...args: T[]): Promise<void> | void;
}

/**
 * Handles updates to password generation options
 * @class PasswordOptionsCommand
 * @implements {FormCommand<unknown>}
 */
class PasswordOptionsCommand implements FormCommand<unknown> {
  constructor(
    private updateOptions: (options: Partial<PasswordOptions>) => void,
    private passwordOptions: PasswordOptions,
  ) {}

  /**
   * Updates specific customization option
   * @param key - Key of customization option to update
   * @param value - New value for the customization option
   */
  updateCustomization(
    key: keyof PasswordOptions["customization"],
    value: unknown,
  ): void {
    this.updateOptions({
      customization: {
        ...this.passwordOptions.customization,
        [key]: value,
      },
    });
  }

  /**
   * Updates single password option
   * @param key - Key of password option to update
   * @param value - New value for the password option
   */
  updateSingle(key: keyof PasswordOptions, value: unknown): void {
    this.updateOptions({ [key]: value });
  }

  execute(): Promise<void> | void {
    // No-op
  }
}

/**
 * Handles password generation on form submission
 * @class PasswordGenerationCommand
 * @implements {FormCommand<React.FormEvent<HTMLFormElement>>}
 */
class PasswordGenerationCommand
  implements FormCommand<React.FormEvent<HTMLFormElement>>
{
  constructor(
    private createPassword: (mode: GenerationMode) => string,
    private setPassword: (password: string) => void,
    private showAlert: (message: string) => void,
    private mode: GenerationMode,
  ) {}

  /**
   * Generates new password and updates state
   * @param event - Form submission event
   */
  execute(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();

    try {
      const password = this.createPassword(this.mode);

      this.setPassword(password);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : i18n.t("error.failed");

      this.showAlert(errorMessage);
    }
  }
}

/**
 * Handles copying text to clipboard with error handling
 * @class ClipboardCommand
 * @implements {FormCommand<string>}
 */
class ClipboardCommand implements FormCommand<string> {
  constructor(private showAlert: (message: string) => void) {}

  /**
   * Copies text to clipboard and shows alert on error
   * @param text - Text to copy to clipboard
   */
  async execute(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : i18n.t("error.unknown");

      this.showAlert(errorMessage);
    }
  }
}

/**
 * Handles updates to passphrase number inclusion
 * @class PassphraseNumberCommand
 * @implements {FormCommand<boolean>}
 */
class PassphraseNumberCommand implements FormCommand<boolean> {
  constructor(
    private updateOptions: (updates: Partial<PassphraseOptions>) => void,
  ) {}

  /**
   * Updates number inclusion in passphrase options
   * @param includeNumber - Whether to include numbers
   */
  execute(includeNumber: boolean): void {
    this.updateOptions({ includeNumber });
  }
}

/**
 * Handles updates to passphrase word count
 * @class PassphraseWordCountCommand
 * @implements {FormCommand<number>}
 */
class PassphraseWordCountCommand implements FormCommand<number> {
  constructor(
    private updateOptions: (updates: Partial<PassphraseOptions>) => void,
  ) {}

  /**
   * Updates word count in passphrase options
   * @param count - New word count
   */
  execute(count: number): void {
    this.updateOptions({ wordCount: count });
  }
}

/**
 * Handles updates to passphrase separator
 * @class PassphraseSeparatorCommand
 * @implements {FormCommand<string>}
 */
class PassphraseSeparatorCommand implements FormCommand<string> {
  constructor(
    private updateOptions: (updates: Partial<PassphraseOptions>) => void,
  ) {}

  /**
   * Updates separator in passphrase options
   * @param separator - New separator
   */
  execute(separator: string): void {
    this.updateOptions({ separator });
  }
}

/**
 * Handles updates to passphrase word style
 * @class PassphraseStyleCommand
 * @implements {FormCommand<WordStyle>}
 */
class PassphraseStyleCommand implements FormCommand<WordStyle> {
  constructor(
    private updateOptions: (updates: Partial<PassphraseOptions>) => void,
  ) {}

  /**
   * Updates word style in passphrase options
   * @param style - New word style
   */
  execute(style: WordStyle): void {
    this.updateOptions({ style });
  }
}

/**
 * Custom hook that provides form handlers for password/passphrase generation
 * @returns {FormHandlerState} Object containing form handler functions
 */
export function useFormHandlers(): FormHandlerState {
  const {
    updatePassphraseOptions,
    updatePasswordOptions,
    passwordOptions,
    createPassword,
    setPassword,
    mode,
  } = useGeneratorStore();
  const { showAlert } = useAlertStore();

  const clipboardCommand = new ClipboardCommand(showAlert);
  const optionsCommand = new PasswordOptionsCommand(
    updatePasswordOptions,
    passwordOptions,
  );
  const generationCommand = new PasswordGenerationCommand(
    createPassword,
    setPassword,
    showAlert,
    mode,
  );
  const wordCountCommand = new PassphraseWordCountCommand(
    updatePassphraseOptions,
  );
  const separatorCommand = new PassphraseSeparatorCommand(
    updatePassphraseOptions,
  );
  const styleCommand = new PassphraseStyleCommand(updatePassphraseOptions);
  const numberCommand = new PassphraseNumberCommand(updatePassphraseOptions);

  return {
    handleCheckboxChange: (key: string, checked: boolean) =>
      optionsCommand.updateSingle(key as keyof PasswordOptions, checked),
    handleSkipAmbiguousChange: (checked: boolean) =>
      optionsCommand.updateCustomization("skipAmbiguous", checked),
    handleExcludeChange: (value: string) =>
      optionsCommand.updateCustomization("exclude", value),
    handleSubmit: (event: React.FormEvent<HTMLFormElement>) =>
      generationCommand.execute(event),
    handleLengthChange: (length: number) =>
      optionsCommand.updateSingle("length", length),
    handleSeparatorChange: (separator: string) =>
      separatorCommand.execute(separator),
    handleIncludeNumberChange: (checked: boolean) =>
      numberCommand.execute(checked),
    handleCopyPassword: (password: string) =>
      clipboardCommand.execute(password),
    handleWordCountChange: (count: number) => wordCountCommand.execute(count),
    handleWordStyleChange: (style: WordStyle) => styleCommand.execute(style),
  };
}
