// @final
//
// NOTE: Do not make changes here without approval.

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
   * @see https://resistjs.dev/doc/settings#metricsUsername
   */
  readonly username: string

  /**
   * Password.
   *
   * @type {string}
   * @memberof IBookMetricsUser
   * @see https://resistjs.dev/doc/settings#metricsPassword
   */
  readonly password: string
}
