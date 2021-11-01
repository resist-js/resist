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
  const packageData = JSON.parse(readFileSync(`${CWD}/package.json`, 'utf-8'))

  const replacer = s => {
    const data = readFileSync(`${CWD}/${s}`, 'utf-8')
    writeFileSync(
      `${CWD}/${s}`,
      data
        .replace(/~APP_NAME~/g, packageData.name)
        .replace(/~AUTHOR~/g, packageData.author)
        .replace(/~TAGLINE~/g, '')
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
  replacer('LICENSE.md')
  replacer('.github/SAVED_REPLIES.md')
  replacer('.github/PULL_REQUEST_TEMPLATE.md')
  replacer('.github/workflows/release.yml')
  replacer('.github/workflows/ci.yml')
  replacer('.github/workflows/codeql.yml')
  replacer('.github/ISSUE_TEMPLATE/bug_report.yml')
  replacer('.github/ISSUE_TEMPLATE/config.yml')
  replacer('.github/ISSUE_TEMPLATE/feature_request.yml')
  replacer('.github/ISSUE_TEMPLATE/documentation.yml')
  replacer('packages/project/package.json')

  replacer('docs/en-US/CONTRIBUTING.md')
  replacer('docs/en-US/CODE_OF_CONDUCT.md')
  replacer('docs/en-US/HOUSEKEEPING.md')
  replacer('docs/en-US/GOVERNANCE.md')
  replacer('docs/en-US/PROJECT_CHARTER.md')
  replacer('docs/en-US/SECURITY.md')
  replacer('docs/en-US/LICENSE.md')
  replacer('docs/en-US/STRUCTURE.md')
  replacer('docs/en-US/GITHUB_ACTIONS.md')
  replacer('docs/en-US/GITHUB_CHECKS.md')
  replacer('docs/en-US/GITHUB_COMMIT.md')
  replacer('docs/en-US/GITHUB_DOCS.md')
  replacer('docs/en-US/GITHUB_ISSUES.md')
  replacer('docs/en-US/GITHUB_PR.md')
  replacer('docs/en-US/GITHUB_RELEASE.md')
  replacer('docs/en-US/GITHUB_SETUP.md')
}

export default main
