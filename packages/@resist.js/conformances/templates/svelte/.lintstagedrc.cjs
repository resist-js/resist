// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* jshint esversion: 9 */

const $fix =
  'prettier --write . --ignore-path .gitignore --plugin-search-dir=. --loglevel=warn && eslint . --ignore-path .gitignore .'

module.exports = {
  '*.{js,ts,json,svelte}': [$fix, 'git add'],
  './project/**/*.{svelte,ts}': [$fix, 'git add'],
  './.{ts,cjs,js}': [$fix],
}
