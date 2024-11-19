import type { HistoryUIState } from "./history-ui.types";

/**
 * Service class for managing history panel UI state
 * Handles visibility state transitions and initial state
 */
export class HistoryUIService {
  /**
   * Updates state to hide the history panel
   * @param state - Current history UI state
   * @returns Updated state with panel hidden
   *
   * @example
   * ```typescript
   * const newState = HistoryUIService.hideHistory(currentState);
   * // Result: { ...currentState, open: false }
   * ```
   */
  static hideHistory(): Partial<HistoryUIState> {
    return {
      open: false,
    };
  }

  /**
   * Updates state to show the history panel
   * @param state - Current history UI state
   * @returns Updated state with panel visible
   *
   * @example
   * ```typescript
   * const newState = HistoryUIService.showHistory(currentState);
   * // Result: { ...currentState, open: true }
   * ```
   */
  static showHistory(): Partial<HistoryUIState> {
    return {
      open: true,
    };
  }

  /**
   * Gets initial history UI state
   * Sets panel as hidden by default
   * @returns Initial history UI state
   */
  static getInitialState(): HistoryUIState {
    return {
      open: false,
    };
  }
}
