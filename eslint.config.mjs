import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import reactPlugin from "eslint-plugin-react";
import globals from "globals";

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.strictTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  {
    files: ["**/*.{js, jsx, mjs, cjs}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    ignores: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/bundle/**",
      "**/public/**",
      "**/tests-examples/**",
      "eslint.config.mjs",
      "**/.gen/**",
    ],
  },
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
        },
      ],
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  //   importPlugin.flatConfigs.recommended,
  //   {
  //     rules: {
  //       "import/order": [
  //         "error",
  //         {
  //           "newlines-between": "always",
  //         },
  //       ],
  //       "import/newline-after-import": "error",
  //       "import/no-duplicates": "error",
  //       "import/first": "error",
  //     },
  //     settings: {
  //       "import/resolver": {
  //         typescript: true,
  //       },
  //     },
  //   },
  reactPlugin.configs.flat.recommended,
  reactPlugin.configs.flat["jsx-runtime"],
  {
    settings: { react: { version: "18" } },
  },
  {
    files: [
      "**/*.test.{js,jsx,ts,tsx}",
      "**/*.spec.{js,jsx,ts,tsx}",
      "**/__tests__/**/*",
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
  },
);
