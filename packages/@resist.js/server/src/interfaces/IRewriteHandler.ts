// @final
//
// NOTE: Do not make changes here without approval.

import type { FastifyRequest } from 'fastify'

/**
 * IRewriteHandler interface.
 *
 * @interface IHandler
 * @exports
 * @see https://resistjs.dev/doc/handlers
 */
export default interface IRewriteHandler {
  (request?: FastifyRequest): string
}
