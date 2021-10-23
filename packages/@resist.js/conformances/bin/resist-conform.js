#!/usr/bin/env node

/* eslint-disable no-console */

// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

const fs = require('fs')

const { exec } = require('child_process')

/**
 * The path that "conformances" is executed from.
 *
 * @type {!string}
 *
 * @see https://resistjs.dev/docs/conformances
 **/
const destination = process.cwd()

/**
 * The path that "conformances" lives in.
 *
 * @type {!string}
 *
 * @see https://resistjs.dev/docs/conformances
 **/
const LIB_DIR = `${process.argv[1].replace('/bin/process.js', '')}/templates/`

/**
 * The path where the template conformances are.
 *
 * @type {!string}
 *
 * @see https://resistjs.dev/docs/conformances
 **/
const source = process.argv[2] === 'svelte' ? `${LIB_DIR}svelte` : `${LIB_DIR}default`

/**
 * Determine whether to call eslint & prettier.
 *
 * @type {!boolean}
 *
 * @see https://resistjs.dev/docs/conformances
 **/
const lintThings = process.argv[3] === 'check'

/**
 * Entry Point.
 */
function main() {
  const Launch = (command, ignoreErrors = false) => {
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
    } catch (e) {
      if (ignoreErrors) return true
      console.error('Error', e)
      return false
    }
  }

  Launch(
    'pnpm i cz-conventional-changelog eslint-config-prettier eslint-plugin-jsdoc eslint-plugin-sonarjs eslint-plugin-tsdoc --save-dev --reporter=silent',
    true,
  )

  if (lintThings) {
    Launch(
      'prettier --write . --ignore-path .gitignore --plugin-search-dir=. --loglevel=warn && eslint . --ignore-path .gitignore .',
    )
  } else {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const package = require(`${CWD}/package.json`)

    const Replacer = s => {
      const data = fs.readFileSync(`${CWD}/${s}`, 'utf-8')
      fs.writeFileSync(
        `${CWD}/${s}`,
        data
          .replace(/~APP_NAME~/g, package.name)
          .replace(/~TAGLINE~/g, '')
          .replace(/~DESCRIPTION~/g, package.description)
          .replace(/~VERSION~/g, package.version)
          .replace(/~HOMEPAGE~/g, package.homepage)
          .replace(
            /~GITHUB_URL~/g,
            package.repository ? package.repository.url.replace('git+', '').replace('.git', '') : package.homepage,
          ),
      )
    }

    Replacer('README.md')
    Replacer('CONTRIBUTING.md')
    Replacer('CODE_OF_CONDUCT.md')
    Replacer('SECURITY.md')
  }
}

// Copy default conformances onto @destination, overwriting what's already there.
require('./copydir')(source, destination, {}, main)
