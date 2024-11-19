import type { StartupState } from "./startup.types";

/**
 * Service class for managing application startup state and onboarding flow
 * Handles welcome screen visibility and initial state management
 */
export class StartupService {
  /**
   * Updates the welcome screen viewed status
   * @param value - Boolean indicating whether the welcome screen has been viewed
   * @returns Updated startup state
   *
   * @example
   * ```typescript
   * const newState = StartupService.updateStatus(true);
   * // Result: { hasSeenWelcome: true }
   * ```
   */
  static updateStatus(value: boolean): StartupState {
    return {
      hasSeenWelcome: value,
    };
  }

  /**
   * Gets initial startup state
   * Sets welcome screen as not viewed by default
   * @returns Initial startup state
   */
  static getInitialState(): StartupState {
    return {
      hasSeenWelcome: false,
    };
  }
}
