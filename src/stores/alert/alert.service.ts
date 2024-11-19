import type { AlertState } from "./alert.types";

/**
 * Service class for managing alert notifications state
 * Handles showing, hiding, and state management of alert messages
 */
export class AlertService {
  /**
   * Attempts to hide the alert
   * Only hides if alert is currently visible
   * @param state - Current alert state
   * @returns Updated state with alert hidden, or unchanged state if cannot hide
   *
   * @example
   * ```typescript
   * const newState = AlertService.hide(currentState);
   * // If visible: { open: false, message: "..." }
   * // If hidden: unchanged state
   * ```
   */
  static hide(state: AlertState): AlertState {
    if (!this.canHide(state)) {
      return state;
    }

    return {
      ...state,
      open: false,
    };
  }

  /**
   * Clears alert message when alert is hidden
   * Prevents clearing message while alert is visible
   * @param state - Current alert state
   * @returns Updated state with message cleared, or unchanged state if alert is visible
   */
  static clearMessage(state: AlertState): AlertState {
    if (state.open) {
      return state;
    }

    return {
      ...state,
      message: null,
    };
  }

  /**
   * Gets initial alert state
   * @returns Default alert state with no message and hidden visibility
   */
  static getInitialState(): AlertState {
    return {
      message: null,
      open: false,
    };
  }

  /**
   * Shows alert with specified message
   * @param message - Message to display in alert
   * @returns New alert state with message and visible status
   *
   * @example
   * ```typescript
   * const state = AlertService.show("Operation successful!");
   * // Result: { open: true, message: "Operation successful!" }
   * ```
   */
  static show(message: string): AlertState {
    return {
      open: true,
      message,
    };
  }

  /**
   * Checks if alert can be hidden
   * Alert can only be hidden if it's currently visible
   * @param state - Current alert state
   * @returns Boolean indicating if alert can be hidden
   */
  static canHide(state: AlertState): boolean {
    return state.open;
  }
}
