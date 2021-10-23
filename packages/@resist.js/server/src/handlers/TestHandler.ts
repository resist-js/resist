// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Test Routes Handling.
 *
 * @param {FastifyInstance} server Server instance reference.
 */
const TestHandler: any = (server: FastifyInstance): void => {
  const StandardHandler = (request: FastifyRequest, reply: FastifyReply): void => {
    let status: any | number = request.url.split('/')
    status = Number(status[status.length - 1])

    reply.status(status)
    reply.header('Content-Type', 'text/html')
    reply.type('text/html')
    reply.send('')
  }

  server.get('/resist/test/301', StandardHandler)
  server.get('/resist/test/403', StandardHandler)
  server.get('/resist/test/404', StandardHandler)
  server.get('/resist/test/500', StandardHandler)
}

export default TestHandler
