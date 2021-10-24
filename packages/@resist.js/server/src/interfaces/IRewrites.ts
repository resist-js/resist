// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { EnvironmentTypes } from '$types/EnvironmentTypes'

/**
 * IRewrites interface.
 *
 * @interface IRewrites
 * @exports
 */
export default interface IRewrites {
  /**
   * The source url to rewrite.
   *
   * @type {string}
   * @memberof IRewrites
   * @see https://resistjs.dev/docs/rewrites#source
   */
  readonly source: string

  /**
   * The destination url.
   *
   * @type {string}
   * @memberof IRewrites
   * @see https://resistjs.dev/docs/rewrites#destination
   */
  readonly destination: string

  /**
   * The environments that the rewrite applies to.
   *
   * @type {Array<EnvironmentTypes>}
   * @memberof IRewrites
   * @see https://resistjs.dev/docs/rewrites#environments
   */
  readonly environments: Array<EnvironmentTypes>
}
