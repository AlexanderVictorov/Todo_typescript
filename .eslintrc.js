module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'no-param-reassign': 0,
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react/jsx-props-no-spreading': 'off',
    'max-len': ['error', { code: 120 }],
    'no-console': 'off',
    'no-unused-vars': 'off',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-filename-extension': 'off',
    'import/extensions': 'off',
    'react/function-component-definition': 'off',
    'no-restricted-exports': 'off',
    'react/prop-types': 'off',
    'react/require-default-props': 'off',
    'class-methods-use-this': 'off',
    camelcase: 'off',
  },
  globals: {
    google: 'readonly',
  },
};
