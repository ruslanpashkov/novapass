/**
 * @file Background service for the NovaPass browser extension
 * This file contains the core background services for password generation,
 * history management, and context menu handling.
 */

import type {
  PassphraseOptions,
  PasswordOptions,
} from "@/libs/secure-key-generator";
import type { GenerationMode, GeneratorState } from "@/stores/generator";
import type { HistoryState, Password } from "@/stores/history";
import type { StorageValue } from "zustand/middleware";
import type { Tabs } from "wxt/browser";

import {
  passphraseGenerator,
  passwordGenerator,
} from "@/libs/secure-key-generator";
import { defineBackground } from "wxt/sandbox";
import { browser } from "wxt/browser";
import { storage } from "wxt/storage";

/** Interface for managing context menu operations */
interface ContextMenuManager {
  /** Determines the generation mode based on the menu item ID */
  getGenerationMode(menuItemId: string | number): GenerationMode;
  /** Checks if a menu item is for password generation */
  isGenerationMenuItem(menuItemId: string | number): boolean;
  /** Updates the visibility of context menu items */
  refreshVisibility(isVisible: boolean): Promise<void>;
  /** Sets up the context menu structure */
  setupMenuItems(): void;
  /** Initializes the context menu system */
  init(): Promise<void>;
}

/** Interface for managing password history operations */
interface HistoryManager {
  /** Adds a new password to the history storage */
  addPassword(password: string): Promise<void>;
  /** Retrieves all stored passwords */
  getPasswords(): Promise<Password[]>;
}

/** Interface for password generation operations */
interface PasswordGenerator {
  /** Generates a new password or passphrase based on the specified mode */
  generate(mode: GenerationMode): Promise<string>;
}

/**
 * Service for managing browser context menu operations
 * Handles creating, updating, and managing context menu items
 */
class ContextMenuManagerService implements ContextMenuManager {
  private readonly MENU_ITEMS = {
    PASSPHRASE: "generate-passphrase",
    PASSWORD: "generate-password",
    SEPARATOR: "separator",
    OPEN: "open-extension",
    ROOT: "novapass",
  };

  private readonly STORAGE_KEY = "sync:ContextMenu";

  /**
   * Creates the context menu structure
   */
  setupMenuItems(): void {
    try {
      browser.contextMenus.create({
        id: this.MENU_ITEMS.ROOT,
        title: "NovaPass",
        contexts: ["all"],
      });

      browser.contextMenus.create({
        title: this.getMessage("menu.generate.password"),
        parentId: this.MENU_ITEMS.ROOT,
        id: this.MENU_ITEMS.PASSWORD,
        contexts: ["all"],
      });

      browser.contextMenus.create({
        title: this.getMessage("menu.generate.passphrase"),
        id: this.MENU_ITEMS.PASSPHRASE,
        parentId: this.MENU_ITEMS.ROOT,
        contexts: ["all"],
      });

      browser.contextMenus.create({
        parentId: this.MENU_ITEMS.ROOT,
        id: this.MENU_ITEMS.SEPARATOR,
        type: "separator",
        contexts: ["all"],
      });

      browser.contextMenus.create({
        title: this.getMessage("menu.open"),
        parentId: this.MENU_ITEMS.ROOT,
        id: this.MENU_ITEMS.OPEN,
        contexts: ["all"],
      });
    } catch (error) {
      console.error("Failed to create context menu items:", error);
    }
  }

  /**
   * Initializes the context menu and sets up visibility listeners
   */
  async init(): Promise<void> {
    try {
      const isVisible = await storage.getItem<boolean>(this.STORAGE_KEY, {
        fallback: true,
      });

      await this.refreshVisibility(isVisible);

      storage.watch<boolean>(this.STORAGE_KEY, (open) =>
        this.refreshVisibility(open ?? true),
      );
    } catch (error) {
      console.error("Failed to initialize context menu:", error);
      await this.refreshVisibility(true);
    }
  }

  /**
   * Updates the visibility of context menu items
   * @param isVisible - Whether the context menu should be visible
   */
  async refreshVisibility(isVisible: boolean): Promise<void> {
    try {
      await browser.contextMenus.removeAll();

      if (isVisible) {
        this.setupMenuItems();
      }
    } catch (error) {
      console.error("Failed to refresh context menu visibility:", error);
    }
  }

  /**
   * Checks if a menu item is for password generation
   * @param menuItemId - The ID of the menu item to check
   */
  isGenerationMenuItem(menuItemId: string | number): boolean {
    const id = String(menuItemId);

    return [this.MENU_ITEMS.PASSPHRASE, this.MENU_ITEMS.PASSWORD].includes(
      id as keyof typeof this.MENU_ITEMS,
    );
  }

  /**
   * Determines the generation mode based on the menu item
   * @param menuItemId - The ID of the menu item
   * @returns The generation mode (password or passphrase)
   */
  getGenerationMode(menuItemId: string | number): GenerationMode {
    return String(menuItemId) === this.MENU_ITEMS.PASSPHRASE
      ? "passphrase"
      : "password";
  }

  /**
   * Helper function to get localized messages using browser.i18n
   * @param key - The message key to lookup
   */
  private getMessage(key: string): string {
    // Since we cannot use #i18n in the background script, we have to use native browser API
    // https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/i18n
    // TODO: Submit an issue to the @wxt-dev/i18n to support background scripts
    // @ts-expect-error - @wxt-dev/i18n cannot generate utility types for background.ts due to circular dependency:
    // background.ts needs i18n utilities, but those utilities need background.ts for generation
    return browser.i18n.getMessage(key.replace(/\./g, "_"));
  }
}

/**
 * Main background application class
 * Coordinates all background services and handles event listeners
 */
class BackgroundApp {
  private readonly contextMenu: ContextMenuManager;
  private readonly generator: PasswordGenerator;
  private readonly history: HistoryManager;

  constructor() {
    this.history = new HistoryManagerService();
    this.contextMenu = new ContextMenuManagerService();
    this.generator = new PasswordGeneratorService();
  }

  /**
   * Sets up event listeners for context menu interactions
   */
  setupEventListeners(): void {
    browser.contextMenus.onClicked.addListener(async (info, tab) => {
      const { menuItemId } = info;

      if (this.contextMenu.isGenerationMenuItem(menuItemId)) {
        await this.handlePasswordGeneration(menuItemId, tab);
      } else if (menuItemId === "open-extension") {
        await browser.action.openPopup();
      }
    });
  }

  /**
   * Starts the background application
   * Initializes all services and sets up event handlers
   */
  async start(): Promise<void> {
    try {
      this.setupEventListeners();
      await this.contextMenu.init();
    } catch (error) {
      console.error("Failed to start background app:", error);
    }
  }

  /**
   * Handles password generation requests from context menu
   * @param menuItemId - The ID of the clicked menu item
   * @param tab - The current browser tab
   */
  private async handlePasswordGeneration(
    menuItemId: string | number,
    tab?: Tabs.Tab,
  ): Promise<void> {
    try {
      const mode = this.contextMenu.getGenerationMode(menuItemId);
      const password = await this.generator.generate(mode);

      await this.history.addPassword(password);

      if (tab?.id) {
        await ClipboardManagerService.copyText(tab.id, password);
      } else {
        await navigator.clipboard.writeText(password);
      }
    } catch (error) {
      console.error("Failed to handle password generation:", error);
      await browser.action.openPopup();
    }
  }
}

/**
 * Service for managing password history
 * Handles storing and retrieving passwords with a maximum history size
 */
class HistoryManagerService implements HistoryManager {
  private readonly STORAGE_KEY = "local:history-storage";
  private readonly MAX_HISTORY_SIZE = 2048;

  /**
   * Adds a new password to the history
   * @param password - The password to add to history
   * @throws Error if saving to storage fails
   */
  async addPassword(password: string): Promise<void> {
    try {
      const passwords = await this.getPasswords();

      const newPassword: Password = {
        createdAt: new Date().toISOString(),
        value: password,
        id: Date.now(),
      };

      const updatedPasswords = [newPassword, ...passwords].slice(
        0,
        this.MAX_HISTORY_SIZE,
      );

      await storage.setItem(this.STORAGE_KEY, {
        state: {
          passwords: updatedPasswords,
        },
      });
    } catch (error) {
      console.error("Failed to add password to history:", error);
      throw new Error("Failed to save password to history");
    }
  }

  /**
   * Retrieves all passwords from storage
   * @returns Array of stored passwords
   */
  async getPasswords(): Promise<Password[]> {
    try {
      const historyState = await storage.getItem<StorageValue<HistoryState>>(
        this.STORAGE_KEY,
      );
      return historyState?.state.passwords || [];
    } catch (error) {
      console.error("Failed to retrieve passwords from storage:", error);
      return [];
    }
  }
}

/**
 * Service for generating passwords and passphrases
 * Handles the generation of secure passwords based on stored options
 */
class PasswordGeneratorService implements PasswordGenerator {
  private readonly STORAGE_KEY = "local:generator-storage";

  /**
   * Generates a new password or passphrase
   * @param mode - The generation mode (password or passphrase)
   * @returns The generated password or passphrase
   * @throws Error if generation fails
   */
  async generate(mode: GenerationMode): Promise<string> {
    try {
      const generatorState = await storage.getItem<
        StorageValue<GeneratorState>
      >(this.STORAGE_KEY);

      const options =
        mode === "passphrase"
          ? (generatorState?.state.passphraseOptions ??
            passphraseGenerator.getInitialOptions())
          : (generatorState?.state.passwordOptions ??
            passwordGenerator.getInitialOptions());

      return mode === "passphrase"
        ? passphraseGenerator.generatePassphrase(options as PassphraseOptions)
        : passwordGenerator.generatePassword(options as PasswordOptions);
    } catch (error) {
      console.error(`Failed to generate ${mode}:`, error);
      throw new Error(`Failed to generate ${mode}`);
    }
  }
}

/**
 * Service for managing clipboard operations
 * Handles copying generated passwords to the clipboard
 */
class ClipboardManagerService {
  /**
   * Copies text to clipboard in a specific tab
   * @param tabId - The ID of the target tab
   * @param text - The text to copy
   * @throws Error if copying fails or tab is invalid
   */
  static async copyText(tabId: number, text: string): Promise<void> {
    if (!tabId) {
      throw new Error("Invalid tab ID");
    }

    try {
      const tab = await browser.tabs.get(tabId);

      if (!tab.url?.startsWith("http")) {
        throw new Error("Cannot access clipboard in this context");
      }

      await browser.scripting.executeScript({
        files: ["content-scripts/content.js"],
        target: { tabId },
      });

      await browser.tabs.sendMessage(tabId, {
        command: "copyText",
        text: text,
      });
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
    }
  }
}

export default defineBackground(() => {
  const app = new BackgroundApp();

  app.start();
});
