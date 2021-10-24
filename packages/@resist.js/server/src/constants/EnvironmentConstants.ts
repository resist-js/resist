// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { EnvironmentTypes } from '$types/EnvironmentTypes'

/**
 * Production Environment.
 *
 * @exports
 * @see https://resistjs.dev/docs/environments
 * @type {EnvironmentTypes}
 */
const PRODUCTION: EnvironmentTypes = 'production'

/**
 * Development Environment.
 *
 * @exports
 * @see https://resistjs.dev/docs/environments
 * @type {EnvironmentTypes}
 */
const DEVELOPMENT: EnvironmentTypes = 'development'

/**
 * QA Environment.
 *
 * @exports
 * @see https://resistjs.dev/docs/environments
 * @type {EnvironmentTypes}
 */
const QA: EnvironmentTypes = 'qa'

export { PRODUCTION, DEVELOPMENT, QA }
