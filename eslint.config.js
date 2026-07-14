import pluginVue from "eslint-plugin-vue";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist/**", "node_modules/**", "coverage/**"] },
  ...pluginVue.configs["flat/essential"],
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{ts,vue}"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser
      }
    },
    rules: {
      "@typescript-eslint/no-explicit-any": "off"
    }
  }
);
