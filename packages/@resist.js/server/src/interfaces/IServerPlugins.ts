// @final
//
// NOTE: Do not make changes here without approval.

import type IServerPlugin from '$interfaces/IServerPlugin'

/**
 * IServerPlugins interface.
 *
 * @interface IServerPlugins
 * @exports
 * @see https://resistjs.dev/doc/server-plugin
 */
export default interface IServerPlugins {
  /**
   * Array of IServerPlugin implementations.
   *
   * @type {IServerPlugin[]}
   * @memberof IServerPlugins
   * @see https://resistjs.dev/doc/server-plugin#plugins
   */
  readonly plugins: IServerPlugin[]
}
