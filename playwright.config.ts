import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      use: { ...devices["Desktop Chrome"] },
      name: "chromium",
    },
    {
      use: { ...devices["Desktop Firefox"] },
      name: "firefox",
    },
  ],
  use: {
    trace: "on-first-retry",
  },
  workers: process.env.CI ? 1 : undefined,
  retries: process.env.CI ? 2 : 0,
  forbidOnly: !!process.env.CI,
  testMatch: "*.spec.{ts,tsx}",
  reporter: "html",
});
