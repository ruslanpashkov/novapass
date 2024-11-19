import { browser } from "wxt/browser";

import type { DirectionState, Direction } from "./direction.types";

/**
 * Service class for managing RTL/LTR direction state
 * Handles direction detection and updates based on browser language
 */
export class DirectionService {
  private static RTL_LANGUAGES = ["ar", "fa", "he", "ur"];

  /**
   * Updates the current direction
   * @param state - Current direction state
   * @param direction - New direction value
   * @returns Updated direction state
   */
  static setDirection(
    state: DirectionState,
    direction: Direction,
  ): DirectionState {
    document.documentElement.dir = direction;

    return {
      ...state,
      direction,
    };
  }

  /**
   * Detects direction based on browser language
   * @returns Detected direction
   */
  static async detectDirection(): Promise<Direction> {
    const language = browser.i18n.getUILanguage();

    return this.getDirectionFromLanguage(language);
  }

  /**
   * Gets initial direction state
   * @returns Default direction state
   */
  static getInitialState(): DirectionState {
    return {
      direction: "ltr",
    };
  }

  /**
   * Determines direction based on language code
   * @param language - Language code
   * @returns Appropriate direction for the language
   */
  private static getDirectionFromLanguage(language: string): Direction {
    return this.RTL_LANGUAGES.some((rtlLang) => language.startsWith(rtlLang))
      ? "rtl"
      : "ltr";
  }
}
