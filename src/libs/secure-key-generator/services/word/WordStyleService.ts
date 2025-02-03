import type { WordStyle } from "../../types";

/**
 * Service for formatting words according to specified style
 * Handles different case styles for passphrase words
 *
 * @class WordStyleService
 *
 * @example
 * ```typescript
 * const styleService = new WordStyleService();
 *
 * styleService.formatWord("hello", "capitalize"); // "Hello"
 * styleService.formatWord("hello", "uppercase");  // "HELLO"
 * styleService.formatWord("HELLO", "lowercase");  // "hello"
 * ```
 */
export class WordStyleService {
  /**
   * Formats a word according to specified style
   *
   * @param word - Word to format
   * @param style - Desired formatting style
   * @returns Formatted word
   *
   * @example
   * ```typescript
   * const service = new WordStyleService();
   *
   * service.formatWord("example", "capitalize"); // "Example"
   * service.formatWord("example", "uppercase");  // "EXAMPLE"
   * service.formatWord("Example", "lowercase");  // "example"
   * ```
   */
  public formatWord(word: string, style: WordStyle): string {
    switch (style) {
      case "capitalize":
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();

      case "uppercase":
        return word.toUpperCase();

      case "lowercase":
        return word.toLowerCase();
    }
  }
}
