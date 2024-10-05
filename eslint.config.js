import { join } from 'path'

import { fixupConfigRules, fixupPluginRules } from '@eslint/compat'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import turbo from 'eslint-config-turbo'
import importPlugin from 'eslint-plugin-import'
import prettier from 'eslint-plugin-prettier/recommended'
import tailwind from 'eslint-plugin-tailwindcss'
import globals from 'globals'
import ts from 'typescript-eslint'

const compat = new FlatCompat()

export default ts.config(
  // Turbo
  ...fixupConfigRules(compat.config(turbo)),
  // General
  {
    ignores: [
      'node_modules/',
      'apps/**/node_modules/',
      'packages/**/node_modules/',
      'packages/**/dist/',
    ],
  },
  {
    files: ['**/*.{js?(x),ts?(x),svelte}'],
    extends: [
      js.configs.recommended,
      ...ts.configs.recommended,
      ...fixupConfigRules(compat.config(importPlugin.configs.recommended)),
      ...fixupConfigRules(compat.config(importPlugin.configs.typescript)),
    ],
    rules: {
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal', ['sibling', 'parent'], 'index', 'unknown'],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ],
      'import/namespace': 'off',
      'import/no-named-as-default-member': 'off',
      'sort-imports': [
        'error',
        {
          ignoreDeclarationSort: true,
        },
      ],
    },
    settings: {
      'import/resolver': {
        typescript: {
          project: ['apps/api/tsconfig.json', 'apps/web/tsconfig.json'],
        },
      },
    },
  },
  // Next
  {
    files: ['apps/web/**/*'],
    extends: [...tailwind.configs['flat/recommended']],
    plugins: {
      '@typescript-eslint': ts.plugin,
      import: fixupPluginRules(importPlugin),
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    rules: {
      'tailwindcss/classnames-order': 'off',
      'tailwindcss/no-custom-classname': 'off',
      'import/default': 'off',
      'import/no-named-as-default': 'off',
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'tv'],
        config: join(process.cwd(), './tailwind.config.ts'),
      },
    },
  },
  prettier
)
