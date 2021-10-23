/* jshint esversion: 9 */

module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
    'plugin:jsdoc/recommended',
    'prettier',
  ],
  plugins: ['@typescript-eslint', 'sonarjs', 'jsdoc', 'eslint-plugin-tsdoc'],
  ignorePatterns: ['*.cjs', '**/tsconfig-paths/*'],
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
  },
  env: {
    browser: true,
    node: true,
    es2020: true,
  },
  rules: {
    'no-console': ['warn'],
    'jsdoc/require-jsdoc': ['error'],
    'jsdoc/require-description': ['error'],
    'jsdoc/newline-after-description': ['error'],
    'jsdoc/check-indentation': ['error'],
    'jsdoc/check-line-alignment': ['error'],
    'jsdoc/check-param-names': ['error'],
    'jsdoc/check-property-names': ['error'],
    'jsdoc/check-syntax': ['error'],
    'jsdoc/no-bad-blocks': ['error'],
    'jsdoc/require-param-description': ['error'],
    'jsdoc/require-param-name': ['error'],
    'jsdoc/require-param-type': ['error'],
    'jsdoc/require-param': ['error'],
    'jsdoc/require-returns-check': ['error'],
    'jsdoc/require-returns-description': ['error'],
    'jsdoc/require-returns-type': ['error'],
    'jsdoc/require-returns': ['error'],
    'jsdoc/valid-types': ['error']
  },
}
