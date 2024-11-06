import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint, { plugin } from "typescript-eslint";
import { rules } from "eslint-config-prettier";


export default [
  {files: ["**/*.{js,mjs,cjs,ts}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['onde_modules'],
    plugins: ['prettier'],
    extends: ['eslint:recommended','plugin:prettier/recommmended'],
    rules: {
      'prettier/prettier': 'error'
    },
  },
];

