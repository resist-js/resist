/* eslint-disable sonarjs/no-nested-template-literals, sonarjs/cognitive-complexity, sonarjs/no-duplicate-string, no-console */

// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import { readFileSync, writeFileSync } from 'node:fs'

/**
 * Entry Point.
 *
 * @param {!string} CWD The directory to operate upon.
 * @exports
 */
function main(CWD) {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const package = require(`${CWD}/package.json`)

  const replacer = s => {
    const data = readFileSync(`${CWD}/${s}`, 'utf-8')
    writeFileSync(
      `${CWD}/${s}`,
      data
        .replace(/~APP_NAME~/g, package.name)
        .replace(/~AUTHOR~/g, package.author)
        .replace(/~TAGLINE~/g, '')
        .replace(/~DESCRIPTION~/g, package.description)
        .replace(/~VERSION~/g, package.version)
        .replace(/~HOMEPAGE~/g, package.homepage)
        .replace(/~CODACY~/g, package.codacy)
        .replace(
          /~REPO~/g,
          package.repository ? package.repository.url.replace('git+https://github.com/', '').replace('.git', '') : '',
        )
        .replace(
          /~GITHUB_URL~/g,
          package.repository ? package.repository.url.replace('git+', '').replace('.git', '') : package.homepage,
        ),
    )
  }

  replacer('.all-contributorsrc')
  replacer('package.json')
  replacer('README.md')
  replacer('CONTRIBUTING.md')
  replacer('CODE_OF_CONDUCT.md')
  replacer('SECURITY.md')
  replacer('.github/SAVED_REPLIES.md')
  replacer('.github/PULL_REQUEST_TEMPLATE.md')
  replacer('.github/workflows/release.yml')
  replacer('.github/workflows/ci.yml')
  replacer('.github/workflows/codeql.yml')
  replacer('.github/ISSUE_TEMPLATE/bug_report.yml')
  replacer('.github/ISSUE_TEMPLATE/config.yml')
  replacer('.github/ISSUE_TEMPLATE/feature_request.yml')
}

module.exports = main
