import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "json", "html"],
      include: ["src/libs"],
      provider: "v8",
    },
    include: ["**/*.test.{ts,tsx}"],
    restoreMocks: true,
    mockReset: true,
  },
  plugins: [WxtVitest()],
});
