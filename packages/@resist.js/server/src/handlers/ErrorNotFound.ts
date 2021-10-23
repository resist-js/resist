// @final
//
// NOTE: Do not make changes here without approval.

import type { FastifyRequest, FastifyReply } from 'fastify'

import type ILogObject from '$interfaces/ILogObject'
import type IHandler from '$interfaces/IHandler'

import RequestLogger from '$handlers/RequestLogger'

/**
 * Handler for responding to 404s.
 *
 * @param {FastifyRequest} request The request.
 * @param {FastifyReply} reply The reply.
 * @exports
 * @see https://resistjs.dev/doc/handlers/404
 * @type {IHandler}
 */
const Handler: IHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  const data: ILogObject = RequestLogger(404, request, reply)

  data
}

export default Handler