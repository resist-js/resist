#!/usr/bin/env node

// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable no-console */

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fs = require('fs')

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { exec } = require('child_process')

/**
 * The path that "conformances" is executed from.
 *
 * @type {!string}
 * @see https://resistjs.dev/docs/conformances
 */
const destination = process.cwd()

/**
 * The path that "conformances" lives in.
 *
 * @type {!string}
 * @see https://resistjs.dev/docs/conformances
 */
const LIB_DIR = `${process.argv[1].replace('/bin/resist-conform.js', '')}/templates/`

/**
 * The path where the template conformances are.
 *
 * @type {!string}
 * @see https://resistjs.dev/docs/conformances
 */
const source = process.argv[2] === 'svelte' ? `${LIB_DIR}svelte` : `${LIB_DIR}default`

/**
 * The absolute path of the current working directory.
 *
 * @type {!string}
 * @exports
 */
const CWD = process.cwd() || '.'

/**
 * Determine whether to call eslint & prettier.
 *
 * @type {!boolean}
 * @see https://resistjs.dev/docs/conformances
 */
const lintThings = process.argv[3] === 'check'

/**
 * Entry Point.
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
function main() {
  const launch = (command, ignoreErrors = false) => {
    try {
      const _ = exec(command, (error, stdout, stderr) => {
        if (ignoreErrors) return true
        if (error) {
          console.error(error.message)
        } else if (stderr) {
          console.error(stderr)
        } else {
          console.log(stdout)
        }
      })
      _.stdout.pipe(process.stdout)
      return true
    } catch (error) {
      if (ignoreErrors) return true
      console.error('Error', error)
      return false
    }
  }

  launch(
    'pnpm i cz-conventional-changelog eslint-config-prettier eslint-plugin-jsdoc eslint-plugin-sonarjs eslint-plugin-tsdoc xo stylelint stylelint-config-standard stylelint-config-standard-scss --save-dev --reporter=silent',
    true,
  )

  if (lintThings) {
    const ifCSS =
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require('glob').sync('**/*.{css,scss}', { cwd: CWD }).length > 0 ? ' && npx stylelint **/*.{css,scss}' : ''

    launch(
      `prettier --write . --ignore-path .gitignore --plugin-search-dir=. --loglevel=warn && eslint . --ignore-path .gitignore . ${ifCSS}`,
    )
    // TODO: && npx xo **/*.{js,ts} <== Add When xo fixed
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const packageData = require(`${CWD}/package.json`)

    const replacer = s => {
      const data = fs.readFileSync(`${CWD}/${s}`, 'utf-8')
      fs.writeFileSync(
        `${CWD}/${s}`,
        data
          .replace(/~APP_NAME~/g, packageData.name)
          .replace(/~AUTHOR~/g, packageData.author)
          .replace(/~LONG_DESCRIPTION~/g, packageData.long_description)
          .replace(/~DESCRIPTION~/g, packageData.description)
          .replace(/~VERSION~/g, packageData.version)
          .replace(/~HOMEPAGE~/g, packageData.homepage)
          .replace(/~CODACY~/g, packageData.codacy)
          .replace(
            /~REPO~/g,
            packageData.repository
              ? packageData.repository.url.replace('git+https://github.com/', '').replace('.git', '')
              : '',
          )
          .replace(
            /~GITHUB_URL~/g,
            packageData.repository
              ? packageData.repository.url.replace('git+', '').replace('.git', '')
              : packageData.homepage,
          ),
      )
    }

    replacer('README.md')
    replacer('CONTRIBUTING.md')
    replacer('CODE_OF_CONDUCT.md')
    replacer('SECURITY.md')
  }
}

// Copy default conformances onto @destination, overwriting what's already there.
// eslint-disable-next-line @typescript-eslint/no-var-requires
lintThings ? main() : require('./copydir.js')(source, destination, {}, main)
