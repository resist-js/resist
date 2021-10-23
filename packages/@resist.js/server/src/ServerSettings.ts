// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type * as net from 'net'

import Book from '$book'

import { REMOVE } from '$constants/PoisonTypeConstants'

import type IServerSettings from '$interfaces/IServerSettings'
import type IServerSettingsHTTP from '$interfaces/IServerSettingsHTTP'
import type IRewriteHandler from '$interfaces/IRewriteHandler'
import type { PoisonTypes } from '$types/PoisonTypes'

import Rewrites from '$handlers/Rewrites'

import { Logger } from '$logger'

import { ReadFile, UUID } from '$utils'

import ServerFactory from 'fastify-http2https'

/**
 * Handler for setting up Server Settings.
 *
 * @exports
 * @class ServerSettings
 * @implements {IServerSettings}
 * @see https://resistjs.dev/doc/settings
 */
export default class ServerSettings implements IServerSettings {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly logger: any
  readonly serverFactory: (fastifyHandler: unknown, opts: unknown) => net.Server
  readonly https: IServerSettingsHTTP
  readonly ignoreTrailingSlash: boolean
  readonly onProtoPoisoning: PoisonTypes
  readonly onConstructorPoisoning: PoisonTypes
  readonly bodyLimit: number
  readonly disableRequestLogging: boolean
  readonly rewriteUrl: IRewriteHandler
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly genReqId: Function

  constructor() {
    // Properties that can be custom
    this.bodyLimit = Book.server.settings.bodyLimit

    // Non-customizable properties
    this.logger = Logger
    this.disableRequestLogging = true
    this.ignoreTrailingSlash = true
    this.onProtoPoisoning = REMOVE
    this.onConstructorPoisoning = REMOVE
    this.https = {
      allowHTTP1: true,
      key: ReadFile('src/certificates/key.pem'),
      cert: ReadFile('src/certificates/cert.pem'),
    }
    this.serverFactory = ServerFactory()

    this.rewriteUrl = Rewrites
    this.genReqId = UUID
  }
}
