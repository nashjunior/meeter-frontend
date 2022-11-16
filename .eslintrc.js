module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'airbnb',
  ],
  globals: {
    JSX: 'readonly',
    React: 'readonly',
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    include: ['src/pages/*', 'src/contexts'],
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'class-methods-use-this': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: true,
        peerDependencies: true,
      },
    ],

    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: ['interface', 'typeAlias'],
        format: ['PascalCase'],
        custom: { regex: '^I[A-Z]', match: true },
      },
    ],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '_' }],
    'no-bitwise': 'warn',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'object-curly-newline': ['error', { ObjectPattern: { multiline: true } }],
    'react-hooks/rules-of-hooks': 'error',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-props-no-spreading': 'off',
    'import/prefer-default-export': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.tsx'] }],
    'react/jsx-one-expression-per-line': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'operator-linebreak': [
      'error',
      'after',
      { overrides: { '?': 'before', ':': 'before' } },
    ],
  },
};
