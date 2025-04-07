import { type WxtViteConfig, defineConfig } from "wxt";

// See https://wxt.dev/api/config.html
export default defineConfig({
  manifest: ({ browser }) => ({
    homepage_url: "https://github.com/ruslanpashkov/novapass",
    permissions: ["clipboardWrite", "storage"],
    description: "__MSG_ext_description__",
    author: "__MSG_ext_author__",
    name: "__MSG_ext_name__",
    default_locale: "en",
    ...(browser === "firefox" && {
      browser_specific_settings: {
        gecko: {
          strict_min_version: "115.0",
          id: "hi@ruslanpashkov.com",
        },
      },
    }),
  }),
  vite: (): WxtViteConfig => ({
    build: {
      chunkSizeWarningLimit: 2048,
    },
  }),
  modules: ["@wxt-dev/module-react", "@wxt-dev/i18n/module"],
  imports: false,
  srcDir: "src",
});
