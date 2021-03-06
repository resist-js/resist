// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type IServerPlugin from '$interfaces/IServerPlugin'

/**
 * IServerPlugins interface.
 *
 * @interface IServerPlugins
 * @exports
 * @see https://resistjs.dev/docs/server-plugin
 */
export default interface IServerPlugins {
  /**
   * Array of IServerPlugin implementations.
   *
   * @type {IServerPlugin[]}
   * @memberof IServerPlugins
   * @see https://resistjs.dev/docs/server-plugin#plugins
   */
  readonly plugins: IServerPlugin[]
}
