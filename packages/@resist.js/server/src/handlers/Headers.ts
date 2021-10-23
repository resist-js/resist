// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import Book from '$book'

import type IHandler from '$interfaces/IHandler'
import type IHeader from '$interfaces/IHeader'

import type { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Handler for Headers.
 *
 * @param {FastifyRequest} request The request.
 * @param {FastifyReply} reply The reply.
 * @exports
 * @see https://resistjs.dev/doc/handlers/headers
 * @type {IHandler}
 */
const Handler: IHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  for (const header of <IHeader[]>(
    Book.server.headers.filter(
      header =>
        header.environments.includes(Book.environment) && (!header.routes || header.routes?.includes(request.url)),
    )
  )) {
    reply.header(header.key, header.value)
  }
}

export default Handler
