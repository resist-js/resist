// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type * as net from 'net'

import type { PoisonTypes } from '$types/PoisonTypes'
import type IServerSettingsHTTP from '$interfaces/IServerSettingsHTTP'
import type IRewriteHandler from '$interfaces/IRewriteHandler'

/**
 * IServerSettings interface.
 *
 * @interface IServerSettings
 * @exports
 * @see https://resistjs.dev/docs/settings
 */
export default interface IServerSettings {
  /**
   * Logger instnace.
   *
   * @type {any}
   * @memberof IServerSettings
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly logger: any

  /**
   * Server factory.
   *
   * @type {Function}
   * @memberof IServerSettings
   */
  readonly serverFactory: (fastifyHandler: unknown, opts: unknown) => net.Server

  /** @private */
  readonly rewriteUrl: IRewriteHandler

  /** @private */
  // eslint-disable-next-line @typescript-eslint/ban-types
  readonly genReqId: Function

  /**
   * Implementaion of Server HTTP settings.
   *
   * @type {IServerSettingsHTTP}
   * @memberof IServerSettings
   */
  readonly https: IServerSettingsHTTP

  /**
   * Whether to ignore trailing slashes in routes.
   *
   * @type {boolean}
   * @memberof IServerSettings
   */
  readonly ignoreTrailingSlash: boolean

  /**
   * How to handle prototype poisoning.
   *
   * @type {PoisonTypes}
   * @memberof IServerSettings
   * @see https://www.fastify.io/docs/latest/Server/#onprotopoisoning
   */
  readonly onProtoPoisoning: PoisonTypes

  /**
   * How to handle constructor poisoning.
   *
   * @type {PoisonTypes}
   * @memberof IServerSettings
   * @see https://www.fastify.io/docs/latest/Server/#onconstructorpoisoning
   */
  readonly onConstructorPoisoning: PoisonTypes

  /**
   * The body size limitation.
   *
   * @type {number}
   * @memberof IServerSettings
   * @see https://www.fastify.io/docs/latest/Server/#bodylimit
   * @see https://resistjs.dev/docs/settings#bodyLimit
   */
  readonly bodyLimit: number

  /**
   * Whether to disable logging of requests.
   *
   * @type {boolean}
   * @memberof IServerSettings
   * @see https://resistjs.dev/docs/settings#logRequests
   */
  readonly disableRequestLogging: boolean
}
