module.exports = {
  extends: [
    'airbnb-base',
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
    'plugin:@typescript-eslint/recommended-type-checked',
    'plugin:@typescript-eslint/stylistic-type-checked',
  ],
  plugins: ['prettier', 'unicorn'],
  parserOptions: {
    project: true,
    warnOnUnsupportedTypeScriptVersion: true,
    EXPERIMENTAL_useProjectService: true,
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  env: {
    browser: true,
    es2024: true
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/resolver': {
      'typescript': {
        'project': './tsconfig.json',
      },
    },
  },
  overrides: [
    {
      files: ['src/**/*.ts'],
      parser: '@typescript-eslint/parser',
      rules: {
        'no-undef': 'off',
      },
    },
    {
      files: ['test.ts'],
      env: {
        node: true,
        browser: false,
        es2024: true
      },
      parserOptions: {
        project: ['./tsconfig.test.json'],
      },
      settings: {
        'import/resolver': {
          'typescript': {
            'project': './tsconfig.test.json',
          },
        },
      }
    },
  ],
  ignorePatterns: ['.eslintrc.cjs', 'examples', 'dist'],
  rules: {
    '@typescript-eslint/unbound-method': [
      'error',
      {
        ignoreStatic: true,
      },
    ],
    '@typescript-eslint/no-floating-promises': 'off',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'warn',
    'unicorn/prefer-ternary': 'off',
    'unicorn/no-thenable': 'off',
    '@typescript-eslint/consistent-type-definitions': ['error', 'type'],
    'no-restricted-syntax': [
      'error',
      {
        selector: 'ForInStatement',
        message:
          'for..in loops iterate over the entire prototype chain, which is virtually never what you want. Use Object.{keys,values,entries}, and iterate over the resulting array.',
      },
      {
        selector: 'LabeledStatement',
        message:
          'Labels are a form of GOTO; using them makes code confusing and hard to maintain and understand.',
      },
      {
        selector: 'WithStatement',
        message:
          '`with` is disallowed in strict mode because it makes code impossible to predict and optimize.',
      },
    ],
    'unicorn/prevent-abbreviations': [
      'error',
      {
        replacements: {
          ref: false,
          Ref: false,
        },
      },
    ],
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-empty-function': 'off',
    'no-param-reassign': ['error', { props: false }],
    'no-continue': 'off',
    'unicorn/no-array-reduce': 'off',
    'unicorn/no-useless-undefined': ['error', { checkArguments: false }],
    'no-plusplus': 'off',
    'unicorn/no-abusive-eslint-disable': 'off',
    'import/no-extraneous-dependencies':[
      'error',
      {
        'devDependencies':[
          'test.ts',
        ]
      }
    ],
    '@typescript-eslint/prefer-nullish-coalescing': 'off'
  },
};
