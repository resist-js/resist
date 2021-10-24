// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/**
 * IBookMetricsElastic interface.
 *
 * @interface IBookMetricsElastic
 * @exports
 * @see https://resistjs.dev/docs/settings#elastic
 */
export default interface IBookMetricsElastic {
  /**
   * The url for the Elastic Search instance.
   *
   * @type {string}
   * @memberof IBookMetricsElastic
   * @see https://resistjs.dev/docs/settings#elasticUrl
   */
  readonly url: string

  /**
   * The username forthe Elastic Search instance.
   *
   * @type {string}
   * @memberof IBookMetricsElastic
   * @see https://resistjs.dev/docs/settings#elasticUrl
   */
  readonly username: string

  /**
   * The password for the Elastic Search instance.
   *
   * @type {string}
   * @memberof IBookMetricsElastic
   * @see https://resistjs.dev/docs/settings#elasticUrl
   */
  readonly password: string
}
