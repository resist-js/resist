// @final
//
// NOTE: Do not make changes here without approval.

import pino from 'pino'

export const Logger = pino({
  redact: ['headers.authorization'],
})

import { DOC_ERROR_URL } from '$constants/Constants'

/**
 * Handler for calling endpoint for reporting.
 *
 * @param {(number | string)} code Error Code or Message.
 * @param {Function} callback Callback function.
 * @exports
 * @see https://resistjs.dev/doc/logger#report
 */
// eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-empty-function
export function Report(code: number | string, callback: Function = () => {}): void {
  callback()

  // TODO: Call logging endpoint
}

/**
 * Handler for cleanly exiting the process.
 *
 * @see https://resistjs.dev/doc/logger#killed
 */
function Killed(): void {
  Info('Leaving so soon? 🥺')

  process.exit(0)
}

/**
 * Log a specific informational message.
 *
 * @exports
 * @param {!string} message The message.
 * @see https://resistjs.dev/doc/logger#info
 */
export function Info(message: string): void {
  Logger.info(message)
}

/**
 * Log a specific warning message.
 *
 * @exports
 * @param {!string} message The message.
 * @see https://resistjs.dev/doc/logger#warn
 */
export function Warn(message: string): void {
  Logger.warn(message)
}

/**
 * Log a specific debug message.
 *
 * @exports
 * @param {!string} message The message.
 * @see https://resistjs.dev/doc/logger#debug
 */
export function Debug(message: string): void {
  Logger.info(message)
}

/**
 * Log a specific error code and then terminate the process.
 *
 * @exports
 * @param {number} code Error Code.
 * @see https://resistjs.dev/doc/logger#error
 */
export function Error(code: number): void {
  const msg = `Something went horribly wrong 🥺.\n\tE${code}, See: ${DOC_ERROR_URL}/${code}`

  HandleErrors(msg)
}

/**
 * Log a specific fatal message.
 *
 * @exports
 * @param {!string} message The message.
 * @see https://resistjs.dev/doc/logger#handleErrors
 */
export function HandleErrors(message: string): void {
  Logger.fatal(message)

  Report(message, () => {
    process.exit(1)
  })
}

/**
 * Log a specific error message.
 *
 * @exports
 * @param {!string} message The message.
 * @see https://resistjs.dev/doc/logger#handleNormalErrors
 */
export function HandleNormalErrors(message: string): void {
  Logger.error(message)

  Report(message)
}

/**
 * Log a specific info message.
 *
 * @exports
 * @param {!string} message The message.
 * @see https://resistjs.dev/doc/logger#handleInfo
 */
export function HandleInfo(message: string): void {
  Logger.info(message)

  Report(message)
}

/**
 * Attach listeners to the server process for when it exits.
 *
 * @exports
 * @see https://resistjs.dev/doc/logger#handleProcess
 */
export function HandleProcess(): void {
  process.on('uncaughtException', HandleErrors)
  process.on('unhandledRejection', HandleErrors)
  process.on('SIGTERM', HandleErrors)
  process.on('SIGINT', Killed)
}
