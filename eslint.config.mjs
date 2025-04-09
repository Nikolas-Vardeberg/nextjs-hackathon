import { defineConfig, globalIgnores } from "eslint/config";
import prettier from "eslint-plugin-prettier";
import jest from "eslint-plugin-jest";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores(["public/*.loader.js"]),
  {
    extends: compat.extends(
      "eslint:recommended",
      "prettier",
      "next/core-web-vitals",
      "next/typescript",
    ),

    plugins: {
      prettier,
    },

    rules: {
      "prettier/prettier": [
        "error",
        {
          semi: true,
          singleQuote: false,
        },
      ],
    },
  },
  {
    files: ["app/**/test.tsx", "common/**/test.tsx"],

    plugins: {
      jest,
    },

    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },

    rules: {},
  },
]);
