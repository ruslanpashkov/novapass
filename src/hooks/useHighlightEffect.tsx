import { useCallback, useState, useRef } from "react";

/**
 * Configuration options for the highlight effect hook
 * @interface UseHighlightEffectOptions
 */
interface UseHighlightEffectOptions {
  /** Callback function to execute when highlight is triggered */
  onHighlight: () => void;
  /** Duration of the highlight effect in milliseconds */
  duration?: number;
}

/**
 * Custom hook that manages a temporary highlight effect state
 * Useful for providing visual feedback after user actions like copying text
 *
 * @param options - Configuration options for the highlight effect
 * @param options.duration - Duration of the highlight effect in milliseconds (default: 2000)
 * @param options.onHighlight - Callback function executed when highlight is triggered
 * @returns Object containing trigger function and current highlight state
 *
 * @example
 * ```tsx
 * const { triggerHighlight, isHighlighted } = useHighlightEffect({
 *   duration: 1500,
 *   onHighlight: () => console.log('Highlighted!')
 * });
 * ```
 */
export const useHighlightEffect = ({
  duration = 2000,
  onHighlight,
}: UseHighlightEffectOptions): {
  /** Function to trigger the highlight effect */
  triggerHighlight: () => void;
  /** Current state of the highlight effect */
  isHighlighted: boolean;
} => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  // Store timeout ID to handle cleanup
  const timeoutRef = useRef<number>(null);

  /**
   * Triggers the highlight effect and manages its lifecycle
   * Clears any existing timeout before starting a new highlight effect
   */
  const triggerHighlight = useCallback(() => {
    // Clear any existing timeout to prevent state conflicts
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    onHighlight();
    setIsHighlighted(true);

    // Set timeout to clear highlight after specified duration
    timeoutRef.current = window.setTimeout(() => {
      setIsHighlighted(false);
    }, duration);
  }, [duration, onHighlight]);

  return {
    triggerHighlight,
    isHighlighted,
  };
};
