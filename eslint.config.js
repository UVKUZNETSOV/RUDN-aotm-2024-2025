import globals from 'globals';
import tseslint from 'typescript-eslint';
import jsdocPlugin from 'eslint-plugin-jsdoc';
import prettierPlugin from 'eslint-plugin-prettier';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '**/build/**'],
  },
  {
    files: ['src/**/*.ts', 'src/**/*.js', 'src/**/*.tsx', 'src/**/*.jsx'],
    languageOptions: {
      sourceType: 'module',
      parser: tseslint.parser,
      globals: globals.browser,
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'jsdoc': jsdocPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      /**
       * JSDoc Rules
       */
      'jsdoc/require-jsdoc': [
        'error',
        {
          contexts: ['TSPropertySignature', 'TSIndexSignature', 'TSEnumMember'],
          require: {
            FunctionDeclaration: false,
          },
        },
      ],
      'jsdoc/check-param-names': 'error',
      'jsdoc/check-tag-names': 'error',
      'jsdoc/check-types': 'error',
      'jsdoc/no-undefined-types': 'error',
      'jsdoc/require-param': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/valid-types': 'error',

      /**
       * TypeScript Rules
       */
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',

      /**
       * Prettier Rules
       */
      'prettier/prettier': ['error'],

      /**
       * Other ESLint Rules
       */
      'no-unreachable': 2,
      'array-callback-return': 2,
      'curly': 2,
      'dot-location': [2, 'property'],
      'dot-notation': 2,
      'eqeqeq': [2, 'smart'],
      'no-alert': 2,
      'no-caller': 2,
      'no-console': ['error', { allow: ['warn', 'error'] }],
      'no-else-return': 2,
      'no-empty-function': 2,
      'no-eq-null': 2,
      'no-eval': 2,
      'no-extend-native': [
        2,
        {
          exceptions: ['Object'],
        },
      ],
      'no-extra-bind': 2,
      'no-extra-label': 2,
      'no-fallthrough': 2,
      'no-floating-decimal': 2,
      'no-implied-eval': 2,
      'no-labels': 2,
      'no-lone-blocks': 2,
      'no-loop-func': 2,
      'no-multi-spaces': 2,
      'no-multi-str': 2,
      'no-new-func': 1,
      'no-new-wrappers': 1,
      'no-octal': 2,
      'no-octal-escape': 2,
      'no-proto': 2,
      'no-redeclare': 2,
      'no-script-url': 2,
      'no-self-compare': 2,
      'no-sequences': 2,
      'no-throw-literal': 2,
      'no-unused-expressions': 2,
      'no-useless-call': 2,
      'no-useless-concat': 2,
      'no-useless-escape': 2,
      'no-useless-return': 2,
      'radix': [2, 'as-needed'],
      'vars-on-top': 2,
      'one-var': [2, { var: 'always' }],
      'wrap-iife': [2, 'inside'],
      'yoda': [2, 'never'],

      /**
       * Variables
       */
      'no-shadow': [2, { allow: ['require'] }],
      'no-shadow-restricted-names': 2,
      'no-undef-init': 2,
      'no-use-before-define': 2,

      /**
       * Stylistic Issues
       */
      'brace-style': [
        2,
        '1tbs',
        {
          allowSingleLine: true,
        },
      ],
      'block-spacing': [2, 'always'],
      'comma-dangle': [2, 'only-multiline'],
      'comma-spacing': [
        2,
        {
          before: false,
          after: true,
        },
      ],
      'comma-style': [2, 'last'],
      'computed-property-spacing': [2, 'never'],
      'consistent-this': [2, 'self', 'modal_ctx'],
      'func-call-spacing': [2, 'never'],
      'func-name-matching': [2, 'always'],
      'id-length': [
        2,
        {
          min: 1,
          max: 50,
          properties: 'always',
        },
      ],
      'key-spacing': 2,
      'keyword-spacing': [
        2,
        {
          after: true,
          before: true,
        },
      ],
      'linebreak-style': [2, 'unix'],
      'max-depth': [
        2,
        {
          max: 4,
        },
      ],
      'max-len': [
        2,
        {
          code: 120,
          comments: 90,
          ignoreStrings: true,
          ignoreRegExpLiterals: true,
          ignoreTemplateLiterals: true,
        },
      ],
      'max-nested-callbacks': [
        2,
        {
          max: 3,
        },
      ],
      'max-params': [
        2,
        {
          max: 4,
        },
      ],
      'max-statements-per-line': [
        2,
        {
          max: 2,
        },
      ],
      'new-cap': [
        2,
        {
          capIsNewExceptions: ['Deferred'],
          capIsNewExceptionPattern: '^url_params\\..',
        },
      ],
      'new-parens': 2,
      'no-array-constructor': 2,
      'no-bitwise': 2,
      'no-continue': 'off',
      'no-lonely-if': 2,
      'no-mixed-spaces-and-tabs': 2,
      'no-multiple-empty-lines': 2,
      'no-negated-condition': 2,
      'no-new-object': 2,
      'no-tabs': 2,
      'no-nested-ternary': 2,
      'no-trailing-spaces': 2,
      'no-unneeded-ternary': 2,
      'no-whitespace-before-property': 2,
      'object-curly-spacing': [2, 'always'],
      'one-var-declaration-per-line': [2, 'initializations'],
      'operator-assignment': [2, 'always'],
      'operator-linebreak': [
        2,
        'after',
        {
          overrides: {
            '?': 'before',
            ':': 'before',
          },
        },
      ],
      'padded-blocks': [2, 'never'],
      'padding-line-between-statements': [
        2,
        {
          blankLine: 'always',
          prev: '*',
          next: 'return',
        },
        {
          blankLine: 'always',
          prev: ['const', 'let', 'var'],
          next: '*',
        },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
        {
          blankLine: 'always',
          prev: 'directive',
          next: '*',
        },
        {
          blankLine: 'any',
          prev: 'directive',
          next: 'directive',
        },
        {
          blankLine: 'always',
          prev: 'block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: 'multiline-block-like',
          next: '*',
        },
        {
          blankLine: 'always',
          prev: '*',
          next: 'multiline-block-like',
        },
        {
          blankLine: 'always',
          prev: ['break', 'return'],
          next: ['case', 'default'],
        },
      ],
      'quote-props': [2, 'consistent-as-needed'],
      'quotes': [
        2,
        'single',
        {
          avoidEscape: true,
        },
      ],
      'semi': 2,
      'semi-spacing': 2,
      'semi-style': [2, 'last'],
      'space-before-blocks': 2,
      'space-in-parens': [2, 'never'],
      'space-infix-ops': 2,
      'space-unary-ops': [
        2,
        {
          words: true,
          nonwords: false,
        },
      ],
      'spaced-comment': [
        2,
        'always',
        {
          block: {
            balanced: true,
          },
        },
      ],
      'switch-colon-spacing': 2,
      'unicode-bom': [2, 'never'],
    },
  },
];
