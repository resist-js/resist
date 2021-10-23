// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/**
 * IBookServerSettings interface.
 *
 * @interface IBookServerSettings
 * @exports
 */
export default interface IBookServerSettings {
  /**
   * The port number being used.
   *
   * @type {number}
   * @memberof IBookServerSettings
   * @see https://resistjs.dev/doc/settings#port
   */
  readonly port: number

  /**
   * Whether to log server requests.
   *
   * @type {boolean}
   * @memberof IBookServerSettings
   * @see https://resistjs.dev/doc/settings#logRequests
   */
  readonly logRequests: boolean

  /**
   * Whether to log not found (404) requests.
   *
   * @type {boolean}
   * @memberof IBookServerSettings
   * @see https://resistjs.dev/doc/settings#logNotFound
   */
  readonly logNotFound: boolean

  /**
   * The body size limitation.
   *
   * @type {number}
   * @memberof IBookServerSettings
   * @see https://www.fastify.io/docs/latest/Server/#bodylimit
   * @see https://resistjs.dev/doc/settings#bodyLimit
   */
  readonly bodyLimit: number
}
