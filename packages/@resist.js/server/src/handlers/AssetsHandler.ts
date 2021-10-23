// @final
//
// NOTE: Do not make changes here without approval.
import type { FastifyInstance } from 'fastify'

import Book from '$book'

import Headers from '$handlers/Headers'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Assets Handling.
 *
 * @param {FastifyInstance} server Server instance reference.
 * @see https://resistjs.dev/doc/server#assets
 */
const AssetsHandler: any = (server: FastifyInstance | any): void => {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const sirv = require('sirv')

  const options = {
    etag: true,
    gzip: true,
    brotli: true,
    setHeaders: reply => {
      Headers(null, reply)
    },
  }

  const prerendered = sirv(`${Book.server.build}prerendered`, options)
  const assets = sirv(`${Book.server.build}assets`, options)

  server.use(prerendered)
  server.use(assets)
}

export default AssetsHandler
