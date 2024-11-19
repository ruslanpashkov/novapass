import { create } from "zustand";

import type { AlertStore } from "./alert.types";

import { AlertService } from "./alert.service";

/**
 * Delay in milliseconds before clearing alert message after hiding
 * Allows for fade-out animations to complete
 */
const CLEAR_MESSAGE_DELAY = 300;

/**
 * Zustand store for managing alert notifications
 * Provides state and actions for showing/hiding alerts with animation support
 *
 * @type {AlertStore}
 *
 * @example
 * ```typescript
 * const { message, open, showAlert, hideAlert } = useAlertStore();
 *
 * // Show an alert
 * showAlert("Operation completed successfully");
 *
 * // Hide current alert
 * hideAlert();
 *
 * // Check alert visibility
 * if (open) {
 *   console.log("Current message:", message);
 * }
 * ```
 */
export const useAlertStore = create<AlertStore>((set) => ({
  // Initialize with default alert state
  ...AlertService.getInitialState(),

  /**
   * Hides the alert and clears its message after animation delay
   * First sets visibility to false, then clears message content
   * to support fade-out animations
   */
  hideAlert: () => {
    set((state) => AlertService.hide(state));

    window.setTimeout(() => {
      set((state) => AlertService.clearMessage(state));
    }, CLEAR_MESSAGE_DELAY);
  },

  /**
   * Shows alert with specified message
   * @param message - Message to display in the alert
   */
  showAlert: (message) => {
    set(() => AlertService.show(message));
  },
}));
