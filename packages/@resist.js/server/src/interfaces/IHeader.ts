// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { EnvironmentTypes } from '$types/EnvironmentTypes'

/**
 * IHeader interface.
 *
 * @interface IHeader
 * @exports
 */
export default interface IHeader {
  /**
   * The key.
   *
   * @type {string}
   * @memberof IHeader
   * @see https://resistjs.dev/docs/headers#key
   */
  readonly key: string

  /**
   * The value.
   *
   * @type {string}
   * @memberof IHeader
   * @see https://resistjs.dev/docs/headers#value
   */
  readonly value: string

  /**
   * The environments that the Header applies to.
   *
   * @type {Array<EnvironmentTypes>}
   * @memberof IHeader
   * @see https://resistjs.dev/docs/headers#environments
   */
  readonly environments: Array<EnvironmentTypes>

  /**
   * The routes that the Header applies to.
   *
   * @type {Array<string>}
   * @memberof IHeader
   * @see https://resistjs.dev/docs/headers#routes
   */
  readonly routes?: Array<string>
}
