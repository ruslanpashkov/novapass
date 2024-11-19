import { create } from "zustand";

import type { HistoryUIStore } from "./history-ui.types";

import { HistoryUIService } from "./history-ui.service";

/**
 * Zustand store for managing history UI visibility state
 * Provides actions to show/hide the history panel
 *
 * @type {HistoryUIStore}
 *
 * @example
 * ```typescript
 * const { isHistoryVisible, showHistory, hideHistory } = useHistoryUIStore();
 *
 * // Show history panel
 * showHistory();
 *
 * // Hide history panel
 * hideHistory();
 *
 * // Check visibility status
 * if (isHistoryVisible) {
 *   // Render history panel
 * }
 * ```
 */
export const useHistoryUIStore = create<HistoryUIStore>()((set) => ({
  // Initialize with default UI state
  ...HistoryUIService.getInitialState(),

  /**
   * Shows the history panel
   * Updates visibility state to true
   */
  showHistory: () => {
    set(() => HistoryUIService.showHistory());
  },

  /**
   * Hides the history panel
   * Updates visibility state to false
   */
  hideHistory: () => {
    set(() => HistoryUIService.hideHistory());
  },
}));
