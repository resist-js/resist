// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type IServerPlugins from '$interfaces/IServerPlugins'
import type IServerSettings from '$interfaces/IServerSettings'

/**
 * IServer interface.
 *
 * @interface IServer
 * @exports
 */
export default interface IServer {
  readonly server: unknown

  readonly startupState: Array<number>

  readonly settings: IServerSettings
  readonly plugins: IServerPlugins

  start(): void
  stop(): void
}
