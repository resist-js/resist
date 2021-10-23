// @final
//
// NOTE: Do not make changes here without approval.

import type ILogObject from '$interfaces/ILogObject'

import { HandleInfo, HandleNormalErrors } from '$logger'

import Book from '$book'
import { VERSION } from '$constants/Constants'

import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const RequestLogger = (
  code: number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  request: FastifyRequest | any,
  reply: FastifyReply,
  error?: FastifyError,
): ILogObject => {
  const data: ILogObject = {
    statusCode: code,
    id: request.id,
    params: request.params,
    url: request.url,
    method: request.method,
    headers: request.headers,
    protocol: request.protocol,
    hostname: request.hostname,
    path: request.routerPath,
    ip: request.ip,
    ips: request.ips,
    version: VERSION,
    appVersion: global.config['app_version'],
    nodeVersion: Book.nodeVersion,
    platform: Book.platform,
    processId: Book.processId,
    message: error?.message,
    uuid: request.id,

    localAddress: request.connection.localAddress,
    localPort: request.connection.localPort,
    remoteAddress: request.connection.remoteAddress,
    remotePort: request.connection.remotePort,
    referer: request.headers.referer,
    authorization: request.headers.authorization,
    cookie: request.headers.cookie,
    origin: request.headers.origin,
    date: request.headers.date,
    etag: request.headers.etag,
    routerMethod: request.routerMethod,

    responseTime: reply.getResponseTime(),

    sessionUUID: request.session.sessionId,
    sessionUUIDEnc: request.session.encryptedSessionId,

    userUUID: request.cookies.user_uuid,
    metrics: {},
  }

  if (code === 404 && Book.server.settings.logNotFound) {
    HandleNormalErrors(JSON.stringify(data))
  } else if (code !== 404 && code !== 200 && code !== 301) {
    HandleNormalErrors(JSON.stringify(data))
  } else {
    HandleInfo(JSON.stringify(data))
  }

  return data
}

export default RequestLogger
