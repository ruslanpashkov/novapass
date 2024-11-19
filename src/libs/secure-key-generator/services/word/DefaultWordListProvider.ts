import type { RandomGenerator } from "../random/RandomGenerator";
import type { WordListProvider } from "./WordListProvider";

import { WORDS } from "../../constants/words";

/**
 * Default implementation of word list provider using EFF word list
 * Provides access to a pre-defined list of words suitable for passphrases
 *
 * @class DefaultWordListProvider
 * @implements {WordListProvider}
 *
 * @example
 * ```typescript
 * const provider = new DefaultWordListProvider();
 * const randomWord = provider.getRandomWord(randomGenerator);
 * ```
 */
export class DefaultWordListProvider implements WordListProvider {
  /**
   * Gets a random word from the EFF word list
   * Uses provided random generator for selection
   *
   * @param randomGenerator - Source of randomness
   * @returns Randomly selected word
   *
   * @example
   * ```typescript
   * const word = provider.getRandomWord(cryptoRandomGenerator);
   * // Returns e.g., "correct" or "battery" or "staple"
   * ```
   */
  public getRandomWord(randomGenerator: RandomGenerator): string {
    const words = this.getWords();

    return words[randomGenerator.getRandomNumber(words.length)];
  }

  /**
   * Gets complete EFF word list
   * @returns Array of all available words
   */
  public getWords(): string[] {
    return WORDS;
  }
}
