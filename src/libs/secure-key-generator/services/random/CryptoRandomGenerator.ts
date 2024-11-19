import type { RandomGenerator } from "./RandomGenerator";

/**
 * Cryptographically secure random number generator
 * Uses Web Crypto API for generating random values with batching for efficiency
 *
 * @class CryptoRandomGenerator
 * @implements {RandomGenerator}
 *
 * @example
 * ```typescript
 * const generator = new CryptoRandomGenerator();
 *
 * // Generate random index for array
 * const randomIndex = generator.getRandomNumber(arrayLength);
 *
 * // Generate random digit
 * const randomDigit = generator.getRandomNumber(10);
 * ```
 */
export class CryptoRandomGenerator implements RandomGenerator {
  /** Size of random values batch for efficiency */
  private readonly RANDOM_BATCH_SIZE = 256;
  /** Buffer for storing batch of random values */
  private randomValues: Uint8Array;
  /** Current position in random values buffer */
  private randomIndex: number;

  /**
   * Initializes generator with empty buffer
   * Buffer will be filled on first use
   */
  constructor() {
    this.randomValues = new Uint8Array(this.RANDOM_BATCH_SIZE);
    this.randomIndex = this.RANDOM_BATCH_SIZE;
  }

  /**
   * Gets next 32-bit random value from buffer
   * Refills buffer when exhausted
   *
   * @returns 32-bit random unsigned integer
   * @private
   *
   * @remarks
   * Uses batching to reduce calls to crypto.getRandomValues
   * Each value is read as a 32-bit unsigned integer
   */
  private getNextRandomValue(): number {
    if (this.randomIndex >= this.randomValues.length) {
      crypto.getRandomValues(this.randomValues);
      this.randomIndex = 0;
    }

    const value = new DataView(
      this.randomValues.buffer,
      this.randomIndex,
      4,
    ).getUint32(0);

    this.randomIndex += 4;

    return value;
  }

  /**
   * Generates a cryptographically secure random number
   * Uses rejection sampling to ensure uniform distribution
   *
   * @param max - Upper bound (exclusive) for random number
   * @returns Random number in range [0, max)
   *
   * @example
   * ```typescript
   * const generator = new CryptoRandomGenerator();
   *
   * // Random number between 0 and 99
   * const randomPercent = generator.getRandomNumber(100);
   *
   * // Random index for array of length 10
   * const randomIndex = generator.getRandomNumber(10);
   * ```
   */
  public getRandomNumber(max: number): number {
    // Calculate bit mask for efficient rejection sampling
    const bitsNeeded = Math.ceil(Math.log2(max));
    const mask = (1 << bitsNeeded) - 1;
    let rand: number;

    // Rejection sampling to ensure uniform distribution
    do {
      rand = this.getNextRandomValue() & mask;
    } while (rand >= max);

    return rand;
  }
}
