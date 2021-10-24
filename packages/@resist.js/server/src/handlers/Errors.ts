// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { FastifyRequest, FastifyReply, FastifyError } from 'fastify'

import type ILogObject from '$interfaces/ILogObject'
import type IErrorHandler from '$interfaces/IErrorHandler'

import RequestLogger from '$handlers/RequestLogger'

/**
 * Handler for responding to errors.
 *
 * @param {FastifyError} error The error.
 * @param {FastifyRequest} request The request.
 * @param {FastifyReply} reply The reply.
 * @exports
 * @see https://resistjs.dev/docs/handlers/errors
 * @type {IErrorHandler}
 */
const Handler: IErrorHandler = async (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
): Promise<void> => {
  const data: ILogObject = RequestLogger(error.statusCode, request, reply, error)

  data
}

export default Handler
