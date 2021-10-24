// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type IHeader from '$interfaces/IHeader'

/**
 * Server Headers.
 *
 * @exports
 * @see https://resistjs.dev/docs/headers
 * @type {IHeader}
 */
const Headers: IHeader[] = [
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
    environments: ['development', 'production', 'qa'],
  },
  {
    key: 'X-Powered-By',
    value: 'resist.js',
    environments: ['development', 'production', 'qa'],
  },
]

export default Headers
