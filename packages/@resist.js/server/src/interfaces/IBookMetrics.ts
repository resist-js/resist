// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type IBookMetricsElastic from './IBookMetricsElastic'
import type IBookMetricsUser from './IBookMetricsUser'

/**
 * IBookMetrics interface.
 *
 * @interface IBookMetrics
 * @exports
 */
export default interface IBookMetrics {
  /**
   * Are Metrics enabled?
   *
   * @type {boolean}
   * @memberof IBookMetrics
   * @see https://resistjs.dev/doc/settings#metrics
   */
  readonly enabled: boolean

  /**
   * The url for the Elastic Search instance.
   *
   * @type {string}
   * @memberof IBookMetrics
   * @see https://resistjs.dev/doc/settings#metricsUrl
   */
  readonly url: string

  /**
   * Valid Users for accessing Metrics.
   *
   * @type {IBookMetricsUser[]}
   * @memberof IBookMetrics
   * @see https://resistjs.dev/doc/settings#metricsUsers
   */
  readonly users: IBookMetricsUser[]

  /**
   * Authentication for Elastic Search instance.
   *
   * @type {string}
   * @memberof IBookMetrics
   * @see https://resistjs.dev/doc/settings#elastic
   */
  readonly elasticSearch: IBookMetricsElastic
}
