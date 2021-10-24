// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import Book from '$book'
import { Info } from '$logger'
import { VERSION } from '$constants/Constants'

import type { FastifyInstance } from 'fastify'

/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Metrics Handling.
 *
 * @param {FastifyInstance} server Server instance reference.
 * @see https://resistjs.dev/docs/server#metrics
 */
const MetricsHandler: any = (server: FastifyInstance): void => {
  if (Book.metrics.enabled) {
    Info(`Registering ${Book.FRAMEWORK} Plugin: Metrics`)

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const metrics: any = require('swagger-stats')

    server.register(metrics.getFastifyPlugin, {
      name: `${Book.FRAMEWORK} metrics`,
      version: VERSION,
      timelineBucketDuration: 60000,
      uriPath: Book.metrics.url,
      durationBuckets: [50, 100, 200, 500, 1000, 5000],
      requestSizeBuckets: [500, 5000, 15000, 50000],
      responseSizeBuckets: [600, 6000, 6000, 60000],
      apdexThreshold: 50,
      authentication: true,
      elasticsearch: Book.metrics.elasticSearch.url,
      elasticsearchUsername: Book.metrics.elasticSearch.username,
      elasticsearchPassword: Book.metrics.elasticSearch.password,
      onAuthenticate: function (req, username, password) {
        return Book.metrics.users.filter(user => user.username === username && user.password === password).length > 0
      },
    })
  } else {
    Info(`Metrics are disabled.`)
  }
}

export default MetricsHandler
