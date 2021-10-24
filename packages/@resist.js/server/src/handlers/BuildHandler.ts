// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import { URL, URLSearchParams } from 'url'
import { get_body as getBody } from '@sveltejs/app-utils/http'

import type { FastifyReply, FastifyRequest } from 'fastify'

import type IHandler from '$interfaces/IHandler'

import Book from '$book'

import RequestLogger from '$burn/handlers/RequestLogger'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Build Handling.
 *
 * @param {(FastifyRequest | any)} request Fastify Request Object.
 * @param {FastifyReply} response Fastify Response Object.
 * @see https://resistjs.dev/docs/server#build
 * @returns {Promise<void>}
 */
const BuildHandler: IHandler = async (request: FastifyRequest | any, response: FastifyReply): Promise<void> => {
  if (request.url.includes('/resist') && !request.url.includes('/resist/setup')) return
  if (request.url.includes('/api/ping')) return

  const host = `${request.headers['x-forwarded-proto']}://${request.headers.host}`
  const { pathname } = new URL(request.url || '', host)

  const { render, init } = await import(`${Book.server.build}app.mjs`)

  await init()
  const rendered = await render({
    host,
    method: request.method,
    headers: request.headers,
    path: pathname,
    query: new URLSearchParams(''),
    body: await getBody(request),
    info: {
      request_uuid: request.id,
      response_time: response.getResponseTime(),

      session_uuid: request.session.sessionId ?? request.cookies.session_uuid,
      session_uuid_enc: request.session.encryptedSessionId,

      user_uuid: request.cookies.user_uuid,

      ip: request.ip,
      ips: request.ips,
      referer: request.headers.referer,
      from: '', // TODO: Implement From Route
      to: '', // TODO: Implement To Route
      user_agent: request.headers['user-agent'],
    },
  })

  if (rendered) {
    const { status, headers, body } = rendered

    if (status === 404) {
      RequestLogger(404, request, response)
    }

    response.status(status)
    response.headers(headers)
    response.header('X-Request-Id', request.id)
    response.header('Content-Type', 'text/html')
    response.type('text/html')
    response.send(body)
  }
}

export default BuildHandler
