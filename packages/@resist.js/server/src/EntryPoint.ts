// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import Book from '$book'

import { Info, Logger } from '$logger'

import { DOC_URL, VERSION } from '$constants/Constants'

import { MemoryUsage } from '$utils'

import Server from '$burn/Server'

/**
 * Entry point for starting Server.
 *
 * @exports
 * @param {(Array<number> | any)} States Error States.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function index(States: Array<number> | any): void {
  // eslint-disable-next-line no-console
  console.clear()

  Info(`❙ -- Booting up ${Book.FRAMEWORK} v${VERSION} ❄️`)
  Info(`❙ -- 📕 Documentation: ${DOC_URL}`)
  Info(`❙ -- Has Been Built? ${Book.isBuilt ? 'Yes' : 'No'}`)
  Info(`❙ -- Port: ${Book.server.settings.port}`)
  Info(`❙ -- Environment: ${Book.environment}`)
  Info(`❙ -- Platform: ${Book.platform}`)
  Info(`❙ -- Working Path: ${Book.workingPath}`)
  Info(`❙ -- Node Version: ${Book.nodeVersion}`)
  Info(`❙ -- Process Id: ${Book.processId}`)
  Info(`❙ -- Memory Useage: ~${MemoryUsage()} MB`)
  if (States.length > 0) {
    Logger.fatal(`❙ -- Errors: ${States.join(', ')}`)
  }

  global[Book.FRAMEWORK] = new Server(States)
}
