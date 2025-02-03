// TODO: Remove when https://github.com/facebook/react/issues/30119 is resolved

declare module "eslint-plugin-react-hooks" {
  import type { Linter, Rule } from "eslint";

  export const configs: {
    recommended: Linter.Config;
  };

  declare const rules: {
    "exhaustive-deps": Rule.RuleModule;
    "rules-of-hooks": Rule.RuleModule;
  };

  declare const plugin: {
    configs: typeof configs;
    rules: typeof rules;
  };

  export default plugin;
}
