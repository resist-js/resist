/* eslint-disable no-console */

// @final
//
// NOTE: Do not make changes here without approval.

import fastify from 'fastify'

import Book from '$book'

import type IServer from '$interfaces/IServer'
import type IServerSettings from '$interfaces/IServerSettings'
import type IServerPlugins from '$interfaces/IServerPlugins'
import type IServerPlugin from '$interfaces/IServerPlugin'

import { Info, Warn } from '$logger'

import ServerSettings from '$burn/ServerSettings'
import ServerPlugins from '$burn/plugins/ServerPlugins'

import Headers from '$handlers/Headers'
import Redirects from '$handlers/Redirects'
import Errors from '$handlers/Errors'
import ErrorNotFound from '$handlers/ErrorNotFound'
import RequestResponse from '$handlers/RequestResponse'
import MetricsHandler from '$handlers/MetricsHandler'
import AssetsHandler from './handlers/AssetsHandler'
import HealthHandler from './handlers/HealthHandler'
import TestHandler from './handlers/TestHandler'
import BuildHandler from './handlers/BuildHandler'

/**
 * Server.
 *
 * @exports
 * @class Server
 * @implements {IServer}
 * @see https://resistjs.dev/doc/server
 */
export default class Server implements IServer {
  // eslint-disable-next-line @typescript-eslint/ban-types
  private framework: Function
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly server: any

  readonly settings: IServerSettings
  readonly plugins: IServerPlugins

  readonly startupState: Array<number>

  private started = false

  constructor(state: Array<number>) {
    this.framework = fastify
    this.settings = new ServerSettings()
    this.plugins = new ServerPlugins()

    this.startupState = state

    this.server = this.framework(this.settings)
    this.server.setErrorHandler(Errors)
    this.server.setNotFoundHandler(ErrorNotFound)

    this._registerPlugins().then(async (): Promise<void> => {
      await this._onStart()
      this.start()
    })
  }

  /**
   * Register all plugins for the server based on whether:
   * - Enabled
   * - Matches environment
   *
   * @private
   * @memberof Server
   */
  private async _registerPlugins(): Promise<void> {
    console.log('\n')

    for (const plugin of <IServerPlugin[]>(
      this.plugins.plugins.filter(
        plugin => plugin.enabled && plugin.dontRegister !== true && plugin.environments.includes(Book.environment),
      )
    )) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const instance: any = await plugin.instance
      Info(`Registering ${Book.FRAMEWORK} Plugin: ${plugin.description}`)

      await this.server.register(instance.default, plugin.options)
    }
  }

  /**
   * Handler for when the Server is ready.
   * - Add Hooks
   * - Add Middleware
   *
   * @private
   * @memberof Server
   */
  private async _onStart(): Promise<void> {
    HealthHandler(this.server, this.startupState)

    this.server.addHook('onRequest', Headers)
    this.server.addHook('onRequest', RequestResponse)
    this.server.addHook('onRequest', Redirects)

    TestHandler(this.server)
    MetricsHandler(this.server)

    if (this.startupState.length > 0) return

    AssetsHandler(this.server)

    this.server.addHook('preHandler', BuildHandler)
  }

  /**
   * Returns whether the Server is currently running.
   *
   * @readonly
   * @type {boolean}
   * @memberof Server
   * @returns {boolean} Returns true if server is running, otherwise false.
   * @see https://resistjs.dev/doc/server#isRunning
   */
  get isRunning(): boolean {
    return this.started
  }

  /**
   * Start the Server.
   *
   * @memberof Server
   * @see https://resistjs.dev/doc/server#start
   */
  public start(): void {
    if (this.started) {
      Warn(`The server can't be started, it's already started.`)
    } else {
      this.server
        .listen({
          port: Book.server.settings.port,
          host: '0.0.0.0',
        })
        .then((): void => {
          this.started = true
        })
        .catch(err => {
          Error(`Sorry, the server failed 🥺:\n\n ${err}`)
        })
    }
  }

  /**
   * Stop the server.
   *
   * @memberof Server
   * @see https://resistjs.dev/doc/server#stop
   */
  public stop(): void {
    if (!this.started) {
      Warn(`The server can't be stopped, it's not running o_O.`)
    } else {
      this.server.close((): void => {
        this.started = false

        Info('The server has been stopped. See you again soon! 👋')
        process.exit(1)
      })
    }
  }
}
