// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { FastifyReply, FastifyRequest, FastifyError } from 'fastify'

/**
 * IErrorHandler interface.
 *
 * @interface IHandler
 * @exports
 * @see https://resistjs.dev/doc/handlers
 */
export default interface IHandler {
  // eslint-disable-next-line @typescript-eslint/ban-types
  (error: FastifyError, request?: FastifyRequest, reply?: FastifyReply, next?: Function): void
}
