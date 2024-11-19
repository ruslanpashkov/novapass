import type { Result } from "@/libs/password-strength";

import { lightGreen, orange, yellow, green, red } from "@mui/material/colors";
import { strengthChecker } from "@/libs/password-strength";
import { useEffect, useState } from "react";
import { i18n } from "#i18n";

/**
 * State interface for password strength analysis
 * @interface PasswordStrengthState
 */
export interface PasswordStrengthState {
  /** Colors for current strength level */
  strengthColor: StrengthColor;
  /** Detailed strength analysis result */
  strength: Result | null;
  /** Strength percentage (0-100) */
  strengthPercent: number;
  /** Human-readable strength level */
  strengthLevel: string;
}

/**
 * Represents color configuration for strength indicator
 * @interface StrengthColor
 */
export interface StrengthColor {
  /** Primary color for strength indicator */
  main: string;
  /** Base/background color for strength indicator */
  base: string;
}

/**
 * Configuration for strength levels and associated colors
 * @constant STRENGTH_CONFIG
 */
const STRENGTH_CONFIG = {
  colors: [
    { main: red[600], base: red[200] },
    { main: orange[600], base: orange[200] },
    { main: yellow[600], base: yellow[200] },
    { main: lightGreen[600], base: lightGreen[200] },
    { main: green[600], base: green[200] },
  ],
  levels: ["Very Weak", "Weak", "Fair", "Good", "Strong"],
} as const;

/**
 * Strategy interface for password strength analysis
 * @interface StrengthStrategy
 */
interface StrengthStrategy {
  /**
   * Analyzes password strength and returns visualization data
   * @param strength - Password strength analysis result
   * @returns Object containing color, percentage and level information
   */
  analyze(strength: Result | null): {
    color: StrengthColor;
    percent: number;
    level: string;
  };
}

/**
 * Observer class that handles password strength analysis lifecycle
 * @class StrengthObserver
 */
class StrengthObserver {
  private mounted = true;

  /**
   * @param callback - Function to call with strength analysis results
   */
  constructor(private callback: (result: Result | null) => void) {}

  /**
   * Updates strength analysis for a given password
   * @param password - Password to analyze
   * @throws {Error} When strength analysis fails
   */
  async updateStrength(password: string): Promise<void> {
    if (!password) {
      this.callback(null);
      return;
    }

    try {
      const result = await strengthChecker.checkStrength(password);

      if (this.mounted) {
        this.callback(result);
      }
    } catch (error: unknown) {
      throw new Error(
        error instanceof Error ? error.message : i18n.t("error.strength"),
      );
    }
  }

  /**
   * Cleanup method to prevent updates after unmount
   */
  cleanup(): void {
    this.mounted = false;
  }
}

/**
 * Default implementation of password strength analysis strategy
 * @class DefaultStrengthStrategy
 * @implements {StrengthStrategy}
 */
class DefaultStrengthStrategy implements StrengthStrategy {
  /**
   * Analyzes password strength and maps it to visual indicators
   * @param strength - Password strength analysis result
   * @returns Object containing visual representation data
   */
  analyze(strength: Result | null) {
    const score = strength?.score ?? -1;
    const index = Math.min(Math.max(score, 0), 4);

    return {
      percent: strength ? (score + 1) * 20 : 0,
      color: STRENGTH_CONFIG.colors[index],
      level: STRENGTH_CONFIG.levels[index],
    };
  }
}

/**
 * Custom hook for password strength analysis
 * Provides real-time strength analysis with visual indicators
 *
 * @param password - Password to analyze
 * @returns {PasswordStrengthState} Object containing strength analysis and visual indicators
 *
 * @example
 * ```tsx
 * const { strengthPercent, strengthColor, strengthLevel } = usePasswordStrength(password);
 * ```
 */
export const usePasswordStrength = (
  password: string,
): PasswordStrengthState => {
  const [strength, setStrength] = useState<Result | null>(null);
  const strategy = new DefaultStrengthStrategy();

  useEffect(() => {
    const observer = new StrengthObserver(setStrength);

    observer.updateStrength(password);

    return () => observer.cleanup();
  }, [password]);

  const { percent, color, level } = strategy.analyze(strength);

  return {
    strengthPercent: percent,
    strengthColor: color,
    strengthLevel: level,
    strength,
  };
};
