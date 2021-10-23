// @final
//
// NOTE: Do not make changes here without approval.

import Book from '$book'

import type IHandler from '$interfaces/IHandler'
import type IRedirects from '$interfaces/IRedirects'

import type { FastifyReply, FastifyRequest } from 'fastify'

/**
 * Handler for Redirects.
 *
 * @param {FastifyRequest} request The request.
 * @param {FastifyReply} reply The reply.
 * @exports
 * @see https://resistjs.dev/doc/handlers/redirects
 * @type {IHandler}
 */
const Handler: IHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  for (const redirect of <IRedirects[]>(
    Book.server.redirects.filter(redirect => redirect.environments.includes(Book.environment))
  )) {
    if (request.url === redirect.source) {
      reply.redirect(redirect.statusCode, redirect.destination)
    }
  }
}

export default Handler
