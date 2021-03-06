/* jshint esversion: 9 */

const $fix =
  'prettier --write . --ignore-path .gitignore --plugin-search-dir=. --loglevel=warn && eslint . --ignore-path .gitignore .'

module.exports = {
  '*.{js,ts,json}': [$fix, 'git add'],
  './src/**/*.{js,ts}': [$fix, 'git add'],
  './bin/**/*.{js,ts}': [$fix, 'git add'],
  './.{ts,cjs,js}': [$fix],
}
