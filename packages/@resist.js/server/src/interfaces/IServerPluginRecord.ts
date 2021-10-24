// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable jsdoc/no-undefined-types */

import type { EnvironmentTypes } from '$types/EnvironmentTypes'

/**
 * IServerPluginRecord interface.
 *
 * @interface IServerPluginRecord
 * @exports
 */
export default interface IServerPluginRecord {
  /**
   * Whether the plugin is enabled.
   *
   * @type {boolean}
   * @memberof IServerPluginRecord
   * @see https://resistjs.dev/docs/server-plugin#enabled
   */
  readonly enabled: boolean

  /**
   * A description of the plugin.
   *
   * @type {string}
   * @memberof IServerPluginRecord
   * @see https://resistjs.dev/docs/server-plugin#description
   */
  readonly description: string

  /**
   * Options associated with the plugin.
   *
   * @type {Record<string, unknown>}
   * @memberof IServerPluginRecord
   * @see https://resistjs.dev/docs/server-plugin#options
   */
  readonly options: Record<string, unknown>

  /**
   * The external package (that can be imported or required) to use
   * for the plugin.
   *
   * @type {string}
   * @memberof IServerPluginRecord
   * @see https://resistjs.dev/docs/server-plugin#fromPackage
   */
  readonly fromPackage: string

  /**
   * Environments that the plugin will be added to.
   *
   * @type {Array<EnvironmentTypes>}
   * @memberof IServerPluginRecord
   * @see https://resistjs.dev/docs/server-plugin#environments
   */
  readonly environments: Array<EnvironmentTypes>

  /**
   * Don't call server.register(...) and instead call
   * server.use(...).
   *
   * @type {boolean}
   * @memberof IServerPluginRecord
   * @see https://resistjs.dev/docs/server-plugin#dontRegister
   */
  readonly dontRegister?: boolean
}
