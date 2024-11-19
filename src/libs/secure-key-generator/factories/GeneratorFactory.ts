import { PassphraseGeneratorService } from "../services/passphrase/PassphraseGeneratorService";
import { PasswordValidationService } from "../services/validation/PasswordValidationService";
import { PasswordGeneratorService } from "../services/password/PasswordGeneratorService";
import { DefaultWordListProvider } from "../services/word/DefaultWordListProvider";
import { CharacterPoolService } from "../services/character/CharacterPoolService";
import { CryptoRandomGenerator } from "../services/random/CryptoRandomGenerator";
import { WordStyleService } from "../services/word/WordStyleService";
import { ErrorHandler } from "../errors";

/**
 * Factory class for creating password and passphrase generators
 * Handles dependency injection and error handling for generator creation
 *
 * @class GeneratorFactory
 *
 * @example
 * ```typescript
 * // Create password generator
 * const passwordGen = GeneratorFactory.createPasswordGenerator();
 * const password = await passwordGen.generatePassword({
 *   length: 16,
 *   symbols: true
 * });
 *
 * // Create passphrase generator
 * const passphraseGen = GeneratorFactory.createPassphraseGenerator();
 * const passphrase = await passphraseGen.generatePassphrase({
 *   wordCount: 4,
 *   style: 'capitalize'
 * });
 * ```
 */
export class GeneratorFactory {
  /**
   * Creates a new password generator with all required dependencies
   * Uses cryptographically secure random generation and validation
   *
   * Dependencies injected:
   * - CryptoRandomGenerator for secure random values
   * - CharacterPoolService for character set management
   * - PasswordValidationService for constraint validation
   *
   * @returns {PasswordGeneratorService} Configured password generator instance
   * @throws {Error} If generator creation fails
   */
  public static createPasswordGenerator(): PasswordGeneratorService {
    try {
      return new PasswordGeneratorService(
        new CryptoRandomGenerator(),
        new CharacterPoolService(),
        new PasswordValidationService(),
      );
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }

  /**
   * Creates a new passphrase generator with all required dependencies
   * Uses EFF wordlist and cryptographically secure random generation
   *
   * Dependencies injected:
   * - CryptoRandomGenerator for secure random values
   * - DefaultWordListProvider for EFF wordlist access
   * - WordStyleService for word formatting
   *
   * @returns {PassphraseGeneratorService} Configured passphrase generator instance
   * @throws {Error} If generator creation fails
   */
  public static createPassphraseGenerator(): PassphraseGeneratorService {
    try {
      return new PassphraseGeneratorService(
        new CryptoRandomGenerator(),
        new DefaultWordListProvider(),
        new WordStyleService(),
      );
    } catch (error) {
      return ErrorHandler.handle(error);
    }
  }
}
