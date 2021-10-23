// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type IServerPlugin from '$interfaces/IServerPlugin'
import type IServerPluginRecord from '$interfaces/IServerPluginRecord'
import type IServerPlugins from '$interfaces/IServerPlugins'

import Book from '$book'
import ServerPlugin from '$burn/plugins/ServerPlugin'

/**
 * Handler for setting up Server Plugins.
 *
 * @exports
 * @class ServerPlugins
 * @implements {IServerPlugins}
 * @see https://resistjs.dev/doc/server-plugin
 */
export default class ServerPlugins implements IServerPlugins {
  readonly plugins: IServerPlugin[]

  constructor() {
    this.plugins = []

    const Plugins = <IServerPluginRecord[]>(
      Book.server.plugins.filter(
        (plugin: IServerPluginRecord) => plugin.enabled && plugin.environments.includes(Book.environment),
      )
    )

    for (const plugin of Plugins) {
      this.plugins.push(
        new ServerPlugin({
          enabled: plugin.enabled,
          description: plugin.description,
          options: plugin.options,
          fromPackage: plugin.fromPackage,
          environments: plugin.environments,
          dontRegister: plugin.dontRegister,
        }),
      )
    }
  }
}
