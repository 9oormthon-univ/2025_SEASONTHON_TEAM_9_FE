import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import { globalIgnores } from "eslint/config";

export default tseslint.config([
  globalIgnores(["dist"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },

    rules: {
      "jsx-a11y/label-has-associated-control": [
        2,
        {
          some: ["nesting", "id"],
        },
      ],
      "@typescript-eslint/indent": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "react/jsx-props-no-spreading": "off",
      "react/require-default-props": "off",
      "no-console": "warn",
      "react/button-has-type": "off",
      "arrow-body-style": "off",
      "@typescript-eslint/no-use-before-define": "off",
      "prettier/prettier": [
        "error",
        {
          endOfLine: "auto",
        },
      ],
      "react/function-component-definition": [
        2,
        { namedComponents: ["function-declaration"] },
      ],
    },
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
      project: "./tsconfig.json",
    },
    ignorePatterns: ["build", "dist", "public"],
  },
]);
