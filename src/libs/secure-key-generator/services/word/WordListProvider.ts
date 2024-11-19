import type { RandomGenerator } from "../random/RandomGenerator";

/**
 * Interface for providing access to word lists
 * Abstracts word list source and random word selection
 *
 * @interface WordListProvider
 *
 * @example
 * ```typescript
 * class CustomWordProvider implements WordListProvider {
 *   getRandomWord(randomGenerator: RandomGenerator): string {
 *     const words = this.getWords();
 *     return words[randomGenerator.getRandomNumber(words.length)];
 *   }
 *
 *   getWords(): string[] {
 *     return ['custom', 'word', 'list'];
 *   }
 * }
 * ```
 */
export interface WordListProvider {
  /**
   * Gets a random word using provided random generator
   * @param randomGenerator - Source of randomness
   * @returns Randomly selected word
   */
  getRandomWord(randomGenerator: RandomGenerator): string;

  /**
   * Gets complete list of available words
   * @returns Array of words
   */
  getWords(): string[];
}
