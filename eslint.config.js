import { fixupConfigRules, fixupPluginRules } from '@eslint/compat';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import typescriptEslintEslintPlugin from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';
import jsxA11Y from 'eslint-plugin-jsx-a11y';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import jest from 'eslint-plugin-jest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [{
  ignores: [
    'client/dist/**/*',
    'client/public/**/*',
    'e2e/playwright-report/**/*',
    'packages/mcp/types/**/*',
    'packages/mcp/dist/**/*',
    'packages/mcp/test_bundle/**/*',
    'api/demo/**/*',
    'packages/data-provider/types/**/*',
    'packages/data-provider/dist/**/*',
    'packages/data-provider/test_bundle/**/*',
    'data-node/**/*',
    'meili_data/**/*',
    '**/node_modules/**/*',
  ],
}, ...fixupConfigRules(compat.extends(
  'eslint:recommended',
  'plugin:react/recommended',
  'plugin:react-hooks/recommended',
  'plugin:jest/recommended',
  'prettier',
  'plugin:jsx-a11y/recommended',
)), {
  plugins: {
    react: fixupPluginRules(react),
    'react-hooks': fixupPluginRules(reactHooks),
    '@typescript-eslint': typescriptEslintEslintPlugin,
    import: importPlugin,
    'jsx-a11y': fixupPluginRules(jsxA11Y),
    'import/parsers': tsParser,
  },

  languageOptions: {
    globals: {
      ...globals.browser,
      ...globals.node,
      ...globals.commonjs,
    },

    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',

    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },

  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      fragment: 'Fragment',
      version: 'detect',
    },

    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },

    'import/resolver': {
      typescript: {
        project: ['./client/tsconfig.json'],
      },

      node: {
        project: ['./client/tsconfig.json'],
      },
    },
  },

  rules: {
    'react/react-in-jsx-scope': 'off',

    '@typescript-eslint/ban-ts-comment': ['error', {
      'ts-ignore': false,
    }],

    indent: ['error', 2, {
      SwitchCase: 1,
    }],

    'max-len': ['error', {
      code: 120,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],

    'linebreak-style': 0,
    curly: ['error', 'all'],
    semi: ['error', 'always'],
    'object-curly-spacing': ['error', 'always'],

    'no-multiple-empty-lines': ['error', {
      max: 1,
    }],

    'no-trailing-spaces': 'error',
    'comma-dangle': ['error', 'always-multiline'],
    'no-console': 'off',
    'import/no-cycle': 'error',
    'import/no-self-import': 'error',
    'import/extensions': 'off',
    'no-promise-executor-return': 'off',
    'no-param-reassign': 'off',
    'no-continue': 'off',
    'no-restricted-syntax': 'off',
    'react/prop-types': ['off'],
    'react/display-name': ['off'],
    'no-nested-ternary': 'error',

    'no-unused-vars': ['error', {
      varsIgnorePattern: '^_',
    }],

    quotes: ['error', 'single'],
    'key-spacing': ['error', { beforeColon: false, afterColon: true }],
  },
}, {
  files: ['**/*.ts', '**/*.tsx'],

  rules: {
    'no-unused-vars': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/no-unused-vars': 'warn',
  },
}, {
  files: ['**/rollup.config.js', '**/.eslintrc.js', '**/jest.config.js'],

  languageOptions: {
    globals: {
      ...globals.node,
    },
  },
}, {
  files: [
    '**/*.test.js',
    '**/*.test.jsx',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.spec.js',
    '**/*.spec.jsx',
    '**/*.spec.ts',
    '**/*.spec.tsx',
    '**/setupTests.js',
  ],

  languageOptions: {
    globals: {
      ...globals.jest,
      ...globals.node,
    },
  },

  rules: {
    'react/display-name': 'off',
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 'off',
  },
}, ...compat.extends(
  'plugin:@typescript-eslint/eslint-recommended',
  'plugin:@typescript-eslint/recommended',
).map(config => ({
  ...config,
  files: ['**/*.ts', '**/*.tsx'],
})), {
  files: ['**/*.ts', '**/*.tsx'],

  plugins: {
    '@typescript-eslint': typescriptEslintEslintPlugin,
    jest: fixupPluginRules(jest),
  },

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: './client/tsconfig.json',
    },
  },

  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    '@typescript-eslint/no-unnecessary-condition': 'warn',
    '@typescript-eslint/strict-boolean-expressions': 'warn',
  },
},
{
  // **Data-provider specific configuration block**
  files: ['./packages/data-provider/**/*.ts'],
  languageOptions: {
    parser: tsParser,
    ecmaVersion: 'latest',
    sourceType: 'module',
    parserOptions: {
      project: './packages/data-provider/tsconfig.json',
    },
  },
},
{
  files: ['./api/demo/**/*.ts'],
}, {
  files: ['./packages/mcp/**/*.ts'],
}, {
  files: ['./config/translations/**/*.ts'],

  languageOptions: {
    parser: tsParser,
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: './config/translations/tsconfig.json',
    },
  },
}, {
  files: ['./packages/data-provider/specs/**/*.ts'],

  languageOptions: {
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: './packages/data-provider/tsconfig.spec.json',
    },
  },
}, {
  files: ['./api/demo/specs/**/*.ts'],

  languageOptions: {
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: './packages/data-provider/tsconfig.spec.json',
    },
  },
}, {
  files: ['./packages/mcp/specs/**/*.ts'],

  languageOptions: {
    ecmaVersion: 5,
    sourceType: 'script',

    parserOptions: {
      project: './packages/mcp/tsconfig.spec.json',
    },
  },
}];