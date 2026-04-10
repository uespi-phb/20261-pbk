import js from '@eslint/js'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import importPlugin from 'eslint-plugin-import'
import vitestPlugin from '@vitest/eslint-plugin'
import nPlugin from 'eslint-plugin-n'
import promisePlugin from 'eslint-plugin-promise'
import eslintConfigPrettier from 'eslint-config-prettier'
import tseslint from 'typescript-eslint'

const sharedTypeScriptRules = {
  '@typescript-eslint/no-unused-vars': [
    'error',
    {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
    },
  ],
  '@typescript-eslint/consistent-type-imports': [
    'error',
    {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports',
    },
  ],
  '@typescript-eslint/no-floating-promises': 'error',
  '@typescript-eslint/no-misused-promises': 'error',
  '@typescript-eslint/await-thenable': 'error',
  '@typescript-eslint/require-await': 'off',
  '@typescript-eslint/return-await': ['error', 'in-try-catch'],
  '@typescript-eslint/no-unnecessary-type-assertion': 'error',
  'import/no-unresolved': 'error',
  'import/order': [
    'error',
    {
      groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
      pathGroups: [
        {
          pattern: '@src/**',
          group: 'internal',
          position: 'after',
        },
      ],
      pathGroupsExcludedImportTypes: ['builtin'],
      alphabetize: {
        order: 'asc',
        caseInsensitive: true,
      },
      'newlines-between': 'always',
    },
  ],
  // Disabled in favor of TypeScript-aware resolution via eslint-plugin-import
  'n/no-missing-import': 'off',
  //
  'promise/catch-or-return': 'error',
  'promise/no-return-wrap': 'error',
  'import/no-duplicates': 'error',
  'import/newline-after-import': 'error',
  'import/first': 'error',
}

export default defineConfig([
  {
    ignores: ['build/**', 'coverage/**', 'node_modules/**', '.eslintcache', '.extra/**', '**/*.tsbuildinfo'],
  },

  js.configs.recommended,

  {
    files: [
      'eslint.config.mjs',
      'vitest.config.mjs',
      'lint-staged.config.mjs',
      '.extra/**/*.js',
      '.extra/**/*.mjs',
      '.extra/**/*.cjs',
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      import: importPlugin,
      promise: promisePlugin,
      n: nPlugin,
    },
    rules: {
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'promise/catch-or-return': 'error',
      'promise/no-return-wrap': 'error',
      'n/no-missing-import': 'off',
      'import/no-unresolved': 'off',
      'import/no-duplicates': 'error',
      'import/newline-after-import': 'error',
      'import/first': 'error',
    },
  },

  {
    files: ['src/**/*.ts'],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      promise: promisePlugin,
      n: nPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.build.json',
        },
        node: true,
      },
    },
    rules: {
      'no-debugger': 'error',
      'no-console': ['error', { allow: ['warn', 'error'] }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/explicit-function-return-type': 'off',
      ...sharedTypeScriptRules,
    },
  },

  {
    files: ['test/**/*.ts'],
    extends: [...tseslint.configs.strictTypeChecked],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...vitestPlugin.environments.env.globals,
      },
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.test.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      import: importPlugin,
      vitest: vitestPlugin,
      promise: promisePlugin,
      n: nPlugin,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.test.json',
        },
        node: true,
      },
    },
    rules: {
      'no-debugger': 'error',
      'no-console': 'warn',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unsafe-assignment': 'error',
      '@typescript-eslint/no-unsafe-member-access': 'error',
      '@typescript-eslint/no-unsafe-argument': 'error',
      '@typescript-eslint/no-unsafe-return': 'error',
      '@typescript-eslint/no-unsafe-call': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      ...sharedTypeScriptRules,
      'vitest/valid-title': 'error',
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/prefer-to-have-length': 'warn',
      'vitest/prefer-strict-equal': 'warn',
      'vitest/expect-expect': 'warn',
      'vitest/no-conditional-expect': 'error',
      'vitest/no-standalone-expect': 'error',
      'vitest/valid-expect': 'error',
    },
  },

  eslintConfigPrettier,
])
