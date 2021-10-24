// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { FastifyRequest, FastifyReply } from 'fastify'

import type IHandler from '$interfaces/IHandler'

import RequestLogger from '$handlers/RequestLogger'

/**
 * Handler for recording Requests and Responses.
 *
 * @param {FastifyRequest} request The request.
 * @param {FastifyReply} reply The reply.
 * @exports
 * @see https://resistjs.dev/docs/handlers/all
 * @type {IHandler}
 */
const Handler: IHandler = async (request: FastifyRequest, reply: FastifyReply): Promise<void> => {
  RequestLogger(reply.statusCode, request, reply)
}

export default Handler
