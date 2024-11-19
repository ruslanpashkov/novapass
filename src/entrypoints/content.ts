/**
 * @file Content script for the NovaPass browser extension
 * This file handles clipboard operations and message passing within browser tabs.
 * It provides a secure way to interact with the clipboard API from the content context.
 */

import { defineContentScript } from "wxt/sandbox";
import { browser } from "wxt/browser";

/**
 * Interface for handling clipboard-related messages
 */
interface MessageHandler {
  /**
   * Handles copying text to the clipboard
   * @param text - The text to copy to clipboard
   * @throws Error if clipboard operation fails
   */
  handleCopyText(text: string): Promise<void>;
}

/**
 * Interface defining the structure of messages that can be received from the background script
 */
interface TabMessage {
  /** The command to execute */
  command: "copyText";
  /** The text content associated with the command */
  text: string;
}

/**
 * Service for handling clipboard operations in the content script context
 * Implements the core clipboard functionality using the Navigator API
 */
class MessageHandlerService implements MessageHandler {
  /**
   * Copies the provided text to clipboard
   * @param text - The text to copy
   * @throws Error if clipboard operation fails
   */
  async handleCopyText(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error("Failed to copy text to clipboard:", error);
      throw new Error("Failed to copy to clipboard");
    }
  }
}

/**
 * Main content script application class
 * Handles message routing and clipboard operations within the browser tab
 */
class ContentApp {
  private readonly messageHandler: MessageHandler;

  constructor() {
    this.messageHandler = new MessageHandlerService();
  }

  /**
   * Sets up listeners for messages from the background script
   * Handles routing of different message commands to appropriate handlers
   */
  setupMessageListeners(): void {
    browser.runtime.onMessage.addListener(async (message) => {
      const { command, text } = message as TabMessage;
      try {
        switch (command) {
          case "copyText":
            await this.messageHandler.handleCopyText(text);
            break;

          default:
            console.error("Unknown command:", command);
        }

        return true;
      } catch (error) {
        console.error("Failed to handle message:", error);

        return false;
      }
    });
  }

  /**
   * Starts the content script application
   * Initializes message listeners and sets up communication channels
   */
  start(): void {
    this.setupMessageListeners();
  }
}

/**
 * Content script definition for the browser extension
 * Configures the script to run on all URLs and initializes the content application
 */
export default defineContentScript({
  /**
   * Main entry point for the content script
   * Creates and starts the content application
   */
  main() {
    const app = new ContentApp();

    app.start();
  },
  /** Specifies that this content script should run on all URLs */
  matches: ["<all_urls>"],
});
