// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { RedirectStatusCodes } from '$types/RedirectStatusCodes'
import type { EnvironmentTypes } from '$types/EnvironmentTypes'

/**
 * IRedirects interface.
 *
 * @interface IRedirects
 * @exports
 */
export default interface IRedirects {
  /**
   * The source url to redirect.
   *
   * @type {string}
   * @memberof IRedirects
   * @see https://resistjs.dev/docs/redirects#source
   */
  readonly source: string

  /**
   * The destination url to redirect to.
   *
   * @type {string}
   * @memberof IRedirects
   * @see https://resistjs.dev/docs/redirects#destination
   */
  readonly destination: string

  /**
   * The HTTP Status Code to use for redirecting.
   *
   * @type {RedirectStatusCodes}
   * @memberof IRedirects
   * @see https://resistjs.dev/docs/redirects#statusCode
   */
  readonly statusCode: RedirectStatusCodes

  /**
   * The environments that the redirect applies to.
   *
   * @type {Array<EnvironmentTypes>}
   * @memberof IRedirects
   * @see https://resistjs.dev/docs/redirects#environments
   */
  readonly environments: Array<EnvironmentTypes>
}
