// @final
//
// NOTE: Do not make changes here without approval.

import type { IncomingHttpHeaders } from 'http'

/**
 * ILogObject interface.
 *
 * @interface IBook
 * @exports
 * @see https://resistjs.dev/doc/server#logobject
 */
export default interface IBook {
  readonly statusCode: number
  readonly id: string
  readonly params: unknown
  readonly url: string
  readonly path: string
  readonly method: string
  readonly headers: IncomingHttpHeaders
  readonly protocol: string
  readonly hostname: string
  readonly ip: string
  readonly ips: string[]
  readonly version: string
  readonly appVersion: string
  readonly nodeVersion: string
  readonly processId: number
  readonly platform: string
  readonly message?: string
  readonly uuid: string
  readonly localAddress: string
  readonly localPort: number
  readonly remoteAddress: string
  readonly remotePort: number
  readonly referer: string
  readonly authorization: string
  readonly cookie: string
  readonly origin: string
  readonly date: string
  readonly etag: string
  readonly routerMethod: string
  readonly responseTime: number
  readonly sessionUUID: string
  readonly sessionUUIDEnc: string
  readonly userUUID: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly metrics: any
}
