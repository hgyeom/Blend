module.exports = {
  root: true,

  env: {
    browser: true,
    node: true,
    es6: true,
  },

  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
    ecmaFeatures: {
      jsx: true,
    },
  },

  plugins: ['react-refresh'],
  extends: [
    // Next.js 권장 규칙
    'next/core-web-vitals',

    // Airbnb 규칙
    'airbnb',
    'airbnb/hooks',

    // typescript-eslint 규칙
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended', // ts 권장

    // react plugin 규칙
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',

    // import plugin 규칙
    'plugin:import/recommended',
    'plugin:import/typescript',

    // prettier 규칙
    'plugin:prettier/recommended',
  ],
  ignorePatterns: ['.next', '.vscode', 'node_modules', '.eslintrc.cjs'],

  rules: {
    semi: ['error', 'never'],
    'react/function-component-definition': [2, { namedComponents: 'arrow-function' }],
    'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'react/jsx-filename-extension': ['warn', { extensions: ['.tsx'] }],
    'react/jsx-props-no-spreading': 0,
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'import/prefer-default-export': 'off',
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external'], 'internal', ['parent', 'sibling'], 'index', 'object'],
        pathGroups: [
          {
            pattern: '~/**',
            group: 'external',
            position: 'before',
          },
          { pattern: '@*', group: 'external', position: 'after' },
          { pattern: '@*/**', group: 'external', position: 'after' },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react-dom'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
  },

  settings: {
    'import/resolver': {
      typescript: {},
    },
    'import/parsers': { '@typescript-eslint/parser': ['.ts'] },
  },
}
