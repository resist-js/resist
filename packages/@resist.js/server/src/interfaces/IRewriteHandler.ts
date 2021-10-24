// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { FastifyRequest } from 'fastify'

/**
 * IRewriteHandler interface.
 *
 * @interface IHandler
 * @exports
 * @see https://resistjs.dev/docs/handlers
 */
export default interface IRewriteHandler {
  (request?: FastifyRequest): string
}
