// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { EnvironmentTypes } from '$types/EnvironmentTypes'
import type IServerPlugin from '$interfaces/IServerPlugin'
import type IServerPluginRecord from '$interfaces/IServerPluginRecord'

/**
 * Handler for creating IServerPlugin instances.
 *
 * @exports
 * @class ServerPlugin
 * @implements {IServerPlugin}
 * @see https://resistjs.dev/doc/server-plugin
 */
export default class ServerPlugin implements IServerPlugin {
  readonly enabled: boolean
  readonly description: string
  readonly instance: unknown
  readonly options: Record<string, unknown>
  readonly environments: Array<EnvironmentTypes>
  readonly dontRegister?: boolean

  constructor(plugin: IServerPluginRecord) {
    this.enabled = plugin.enabled
    this.description = plugin.description
    this.options = plugin.options
    this.instance = import(plugin.fromPackage)
    this.environments = plugin.environments
    this.dontRegister = plugin.dontRegister
  }
}
