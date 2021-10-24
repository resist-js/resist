// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/**
 * IBookMetricsUser interface.
 *
 * @interface IBookMetricsUser
 * @exports
 */
export default interface IBookMetricsUser {
  /**
   * Username.
   *
   * @type {string}
   * @memberof IBookMetricsUser
   * @see https://resistjs.dev/docs/settings#metricsUsername
   */
  readonly username: string

  /**
   * Password.
   *
   * @type {string}
   * @memberof IBookMetricsUser
   * @see https://resistjs.dev/docs/settings#metricsPassword
   */
  readonly password: string
}
