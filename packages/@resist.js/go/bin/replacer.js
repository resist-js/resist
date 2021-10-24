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
  const packageData = require(`${CWD}/package.json`)

  const replacer = s => {
    const data = readFileSync(`${CWD}/${s}`, 'utf-8')
    writeFileSync(
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

export default main
