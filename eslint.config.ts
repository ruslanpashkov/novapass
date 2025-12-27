import perfectionist from "eslint-plugin-perfectionist";
import reactRefresh from "eslint-plugin-react-refresh";
import reactHooks from "eslint-plugin-react-hooks";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import globals from "globals";
import js from "@eslint/js";

export default tseslint.config(
  { ignores: [".wxt/", ".output/"] },
  {
    rules: {
      ...react.configs.flat.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "error",
        { allowConstantExport: true },
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-restricted-imports": "off",
      "react/react-in-jsx-scope": "off",
    },
    extends: [js.configs.recommended, tseslint.configs.recommended],
    plugins: {
      perfectionist: perfectionist,
      "react-refresh": reactRefresh,
      "react-hooks": reactHooks,
      react,
    },
    settings: {
      react: {
        version: "detect",
        pragma: "React",
      },
    },
    languageOptions: {
      globals: globals.browser,
      ecmaVersion: 2020,
    },
    files: ["**/*.{ts,tsx}"],
  },
);
