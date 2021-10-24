// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable jsdoc/no-undefined-types */

import type { EnvironmentTypes } from '$types/EnvironmentTypes'

/**
 * IServerPlugin interface.
 *
 * @interface IServerPlugin
 * @exports
 * @see https://resistjs.dev/docs/server-plugin
 */
export default interface IServerPlugin {
  /**
   * Whether the plugin is enabled.
   *
   * @type {boolean}
   * @memberof IServerPlugin
   * @see https://resistjs.dev/docs/server-plugin#enabled
   */
  readonly enabled: boolean

  /**
   * A description of the plugin.
   *
   * @type {string}
   * @memberof IServerPlugin
   * @see https://resistjs.dev/docs/server-plugin#description
   */
  readonly description: string

  /**
   * A reference to the instance of the plugin.
   *
   * @type {any}
   * @memberof IServerPlugin
   * @see https://resistjs.dev/docs/server-plugin#instance
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly instance: any

  /**
   * Options associated with the plugin.
   *
   * @type {Record<string, unknown>}
   * @memberof IServerPlugin
   * @see https://resistjs.dev/docs/server-plugin#options
   */
  readonly options: Record<string, unknown>

  /**
   * Environments that the plugin will be added to.
   *
   * @type {Array<string>}
   * @memberof IServerPlugin
   * @see https://resistjs.dev/docs/server-plugin#environments
   */
  readonly environments: Array<EnvironmentTypes>

  /**
   * Don't call server.register(...) and instead call
   * server.use(...).
   *
   * @type {boolean}
   * @memberof IServerPlugin
   * @see https://resistjs.dev/docs/server-plugin#dontRegister
   */
  readonly dontRegister?: boolean
}
