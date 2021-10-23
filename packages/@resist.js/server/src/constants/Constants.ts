// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import Package from '../../package.json'

/**
 * Documentation URL.
 *
 * @exports
 * @type {string}
 */
export const DOC_URL = 'https://resistjs.dev/doc'

/**
 * Documentation Error URL.
 *
 * @exports
 * @type {string}
 */
export const DOC_ERROR_URL = `${DOC_URL}/errors`

/**
 * Application Version.
 *
 * @exports
 * @type {string}
 */
export const VERSION: string = Package.version ?? 'n/a'
