// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable sonarjs/cognitive-complexity */

import Book from '$book'
import { DOC_ERROR_URL, VERSION } from '$constants/Constants'
import { IsArray, FileExists, IsUp, PathExists } from '$utils'
import { Logger, Debug, Info, HandleProcess } from '$logger'

/**
 * 📗 What's happening?
 * - Attach process listeners
 * - Validating the contents of Book
 * - Resolve
 *
 * @exports
 * @returns {Promise<void>} Resolved Promise.
 */
export default function Validator(): Promise<void> {
  HandleProcess()

  Info(`\n\nWelcome to ${Book.FRAMEWORK} v${VERSION} ❅ ~\n\n`)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return new Promise<any>(resolve => {
    const States: number[] = []

    try {
      Debug('Validating Book...')
      Debug(`📕 Book Contents\n\n${JSON.stringify(Book)}\n\n`)

      const CertExists: boolean = FileExists(`src/certificates/cert.pem`)
      const CertKeyExists: boolean = FileExists(`src/certificates/key.pem`)
      const BuildExists: boolean = PathExists(Book.server.build)
      const AssetsExists: boolean = PathExists(`${Book.server.build}assets`)
      const PrerenderedExists: boolean = PathExists(`${Book.server.build}prerendered`)

      if (!Book.environment) States.push(1000)
      if (!Book.server) States.push(1001)
      if (!Book.server.settings) States.push(1002)
      if (0 >= Book.server.settings.port) States.push(1003)
      if (0 >= Book.server.settings.bodyLimit) States.push(1004)
      if (!IsArray(Book.server.headers)) States.push(1005)
      if (!IsArray(Book.server.rewrites)) States.push(1006)
      if (!IsArray(Book.server.redirects)) States.push(1007)
      if (!IsArray(Book.server.plugins)) States.push(1008)

      if (Book.metrics.enabled) {
        if (!Book.metrics.url) States.push(1011)
        if (!Book.metrics.users) States.push(1012)
        if (Book.metrics.elasticSearch.url) {
          if (!IsUp(Book.metrics.elasticSearch.url)) States.push(1020)
          if (!Book.metrics.elasticSearch.username) States.push(1013)
          if (!Book.metrics.elasticSearch.password) States.push(1014)
        }
      }

      if (!Book.server.cookieSecret) States.push(1015)

      if (Book.storybook.enabled) {
        if (!Book.storybook.url) States.push(1018)
        if (!IsUp(Book.storybook.url)) States.push(1021)
      }

      if (Book.flags.enabled) {
        if (!Book.flags.url) States.push(1019)
        if (!IsUp(Book.flags.url)) States.push(1022)
      }

      if (!CertExists) States.push(1009)
      if (!CertKeyExists) States.push(1010)
      if (!BuildExists) States.push(1016)
      if (!AssetsExists) States.push(1023)
      if (!PrerenderedExists) States.push(1024)
    } catch (err) {
      Debug(err)
      States.push(1017)
    }

    if (States.length > 0) {
      Logger.fatal(
        `❌ The following errors occurred on startup: ${States.join(
          ', ',
        )}. The server could not properly start. To understand what these mean, navigate to: ${DOC_ERROR_URL}`,
      )
    }

    resolve(States)
  })
}
