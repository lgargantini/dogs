import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["**/build/", "**/*.config.mjs", "**/dist/**", "**/node_modules/"],
  },
  {
    files: ["src/**/*.{ts,jsx,tsx}, src/__tests__/**/*.{ts,jsx,tsx}"],
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        ecmaFeatures: { jsx: true },
        globals: globals.browser,
        parser: "@typescript-eslint/parser",
        project: true,
      },
    },
  },
  ...tseslint.configs.recommendedTypeChecked,
];
