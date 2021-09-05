module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: '@typescript-eslint/parser',
  extends: [
    // for disable eslint-recommend rules
    'plugin:@typescript-eslint/eslint-recommended',

    // for enable Typescript lint rules and apply eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // for enable eslint-plugin-prettier and eslint-config-prettier
    'plugin:prettier/recommended'
  ],
  plugins: ['react', '@typescript-eslint', 'react-hooks', 'prettier', 'import'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  rules: {
    // eslint basic rules
    // error rules
    'no-console': 'error',
    'no-eq-null': 'error',
    'no-param-reassign': ['error', {props: true}],
    'array-element-newline': ['error', 'consistent'],
    'arrow-body-style': 'error',
    'object-curly-newline': ['error', {consistent: true}],
    'space-infix-ops': 'error',
    'no-mixed-spaces-and-tabs': 'error',

    // warn rules
    'consistent-return': 'warn',
    'prefer-destructuring': 'warn',
    'no-underscore-dangle': 'warn',
    'newline-per-chained-call': 'warn',
    'camelcase': 'warn',
    'no-useless-constructor': 'warn',
    'indent': [
      'warn',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 5
        },
        FunctionExpression: {
          parameters: 1,
          body: 1
        }
      }
    ],

    // off rules
    'max-len': 'off',
    'no-unused-vars': 'off',
    'no-shadow': 'off',
    'prettier/prettier': 'off',

    // typescript rules
    // error rules
    '@typescript-eslint/no-use-before-define': ['error', {functions: false, variables: false}],
    '@typescript-eslint/no-unused-vars': ['error', {vars: 'all', args: 'none'}],
    '@typescript-eslint/member-delimiter-style': [
      'error',
      {
        multiline: {
          delimiter: 'none',
          requireLast: false
        }
      }
    ],

    // warn rules
    '@typescript-eslint/no-useless-constructor': 'warn',
    '@typescript-eslint/explicit-member-accessibility': ['warn', {accessibility: 'explicit'}],
    '@typescript-eslint/no-var-requires': 'warn',
    '@typescript-eslint/no-empty-interface': 'warn',
    '@typescript-eslint/no-shadow': 'warn',

    // off rules
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',

    //import Rules
    // error rules
    'import/order': [
      'error',
      {
        // Order import types
        'groups': [['builtin', 'external'], 'internal', ['parent', 'sibling', 'index']],
        //Combine and Group patterns
        'pathGroups': [
          {
            pattern: '@blog/shared*/**',
            group: 'external',
            position: 'after'
          },
          {
            pattern: '@blog/**',
            group: 'external',
            position: 'after'
          }
        ],
        'pathGroupsExcludedImportTypes': ['builtin'],
        'newlines-between': 'always'
      }
    ]
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
}
