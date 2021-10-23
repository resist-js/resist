// @final
//
// NOTE: Do not make changes here without approval.

import type { EnvironmentTypes } from '$types/EnvironmentTypes'

/**
 * Production Environment.
 *
 * @exports
 * @see https://resistjs.dev/doc/environments
 * @type {EnvironmentTypes}
 */
const PRODUCTION: EnvironmentTypes = 'production'

/**
 * Development Environment.
 *
 * @exports
 * @see https://resistjs.dev/doc/environments
 * @type {EnvironmentTypes}
 */
const DEVELOPMENT: EnvironmentTypes = 'development'

/**
 * QA Environment.
 *
 * @exports
 * @see https://resistjs.dev/doc/environments
 * @type {EnvironmentTypes}
 */
const QA: EnvironmentTypes = 'qa'

export { PRODUCTION, DEVELOPMENT, QA }
