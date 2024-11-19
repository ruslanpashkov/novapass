/**
 * Interface for generating random numbers
 * Abstracts random number generation to allow different implementations
 *
 * @interface RandomGenerator
 *
 * @example
 * ```typescript
 * class CustomGenerator implements RandomGenerator {
 *   getRandomNumber(max: number): number {
 *     // Implementation
 *     return randomValue;
 *   }
 * }
 * ```
 */
export interface RandomGenerator {
  /**
   * Generates a random number between 0 (inclusive) and max (exclusive)
   * @param max - Upper bound (exclusive) for random number
   * @returns Random number in range [0, max)
   */
  getRandomNumber(max: number): number;
}
