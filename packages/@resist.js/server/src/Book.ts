// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable sonarjs/no-duplicate-string */

import type IBook from '$interfaces/IBook'

import type { EnvironmentTypes } from '$types/EnvironmentTypes'

import type IBookMetricsUser from '$interfaces/IBookMetricsUser'
import type IHeader from '$interfaces/IHeader'
import type IRedirects from '$interfaces/IRedirects'
import type IRewrites from '$interfaces/IRewrites'

import Headers from '$burn/headers/Headers'
import Redirects from '$burn/redirects/Redirects'
import Rewrites from '$burn/rewrites/Rewrites'

/**
 * Book.
 *
 * @type {IBook}
 * @exports
 * @see https://resistjs.dev/docs/book#server
 */
const Book: IBook = {
  FRAMEWORK: 'resist.js',
  environment: <EnvironmentTypes>(global.config.environment ?? 'development'),
  isBuilt: <EnvironmentTypes>(global.config.environment ?? 'development') === <EnvironmentTypes>'production',
  server: {
    build: '/usr/local/build/',
    settings: {
      port: Number(global.config['server.port'] ?? 0),
      logRequests: Boolean(global.config['log.requests']),
      bodyLimit: Number(global.config['server.body_limit']) > 0 ? Number(global.config['server.body_limit']) : 999999,
      logNotFound: Boolean(global.config['log.notfound']),
    },
    cookieSecret: global.config['session.secret'],
    plugins: [
      {
        enabled: true,
        description: 'Middleware Handler.',
        options: {},
        fromPackage: 'fastify-express',
        environments: ['production', 'development', 'qa'],
      },
      {
        enabled: true,
        description: 'Brotli Compression.',
        options: { global: true },
        fromPackage: 'fastify-compress',
        environments: ['production', 'development', 'qa'],
      },
      {
        enabled: true,
        description: 'favicon Handler.',
        options: {},
        fromPackage: 'fastify-no-icon',
        environments: ['production', 'development', 'qa'],
      },
      {
        enabled: false,
        description: 'Graceful Shutdown Handler.',
        options: {},
        fromPackage: '@dnlup/fastify-traps',
        environments: [],
      },
      {
        enabled: true,
        description: 'Cookie Handler.',
        options: { secret: global.config['session.secret'] ?? 'resist_12345678901234567890' },
        fromPackage: 'fastify-cookie',
        environments: ['production', 'development', 'qa'],
      },
      {
        enabled: true,
        description: 'Session Handler.',
        options: {
          secret: global.config['session.secret'] ?? 'resist_12345678901234567890',
          expires: 1800000,
        },
        fromPackage: 'fastify-session',
        environments: ['production', 'development', 'qa'],
      },
      {
        enabled: true,
        description: 'Peekaboo Handler.',
        options: {},
        fromPackage: 'fastify-peekaboo',
        environments: ['production'],
      },
      {
        enabled: true,
        description: 'Security Headers.',
        options: {
          enableCSPNonces: false,
          contentSecurityPolicy: false,
        },
        environments: ['production'],
        fromPackage: 'fastify-helmet',
      },
    ],
    headers: [...Headers, ...(<IHeader[]>(<unknown>(global.config.headers ?? [])))],
    redirects: [...Redirects, ...(<IRedirects[]>(<unknown>(global.config.redirects ?? [])))],
    rewrites: [...Rewrites, ...(<IRewrites[]>(<unknown>(global.config.rewrites ?? [])))],
  },
  metrics: {
    enabled: Boolean(global.config['metrics.enabled']),
    url: global.config['metrics.url'],
    users: <IBookMetricsUser[]>(<unknown>(global.config['metrics.users'] ?? [])),
    elasticSearch: {
      url: global.config['elastic.url'],
      username: global.config['elastic.username'],
      password: global.config['elastic.password'],
    },
  },
  flags: {
    enabled: Boolean(global.config['flags.enabled']),
    url: global.config['flags.url'],
  },
  storybook: {
    enabled: Boolean(global.config['storybook.enabled']),
    url: global.config['storybook.url'],
  },
  nodeVersion: process.version,
  processId: process.pid,
  platform: `${process.platform} ${process.arch}`,
  workingPath: process.cwd(),
}

export default Book
