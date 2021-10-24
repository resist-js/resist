// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import Book from '$book'

import type IRewriteHandler from '$interfaces/IRewriteHandler'
import type IRewrites from '$interfaces/IRewrites'

import type { FastifyRequest } from 'fastify'

/**
 * Handler for Rewrites.
 *
 * @param {FastifyRequest} request The request.
 * @exports
 * @see https://resistjs.dev/docs/handlers/rewrites
 * @type {IRewriteHandler}
 */
const Handler: IRewriteHandler = (request: FastifyRequest): string => {
  for (const rewrite of <IRewrites[]>(
    Book.server.rewrites.filter(rewrite => rewrite.environments.includes(Book.environment))
  )) {
    if (request.url === rewrite.source) {
      return rewrite.destination
    }
  }

  return request.url
}

export default Handler
