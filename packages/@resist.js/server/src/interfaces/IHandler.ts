// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { FastifyReply, FastifyRequest } from 'fastify'

/**
 * IHandler interface.
 *
 * @interface IHandler
 * @exports
 * @see https://resistjs.dev/docs/handlers
 */
export default interface IHandler {
  // eslint-disable-next-line @typescript-eslint/ban-types, @typescript-eslint/no-explicit-any
  (request?: FastifyRequest | any, reply?: FastifyReply, next?: Function): void | Promise<void>
}
