// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type { EnvironmentTypes } from '$types/EnvironmentTypes'
import type IBookServer from '$interfaces/IBookServer'
import type IBookMetrics from '$interfaces/IBookMetrics'
import type IBookStorybook from '$interfaces/IBookStorybook'
import type IBookFeatureFlags from '$interfaces/IBookFeatureFlags'

/**
 * IBook interface.
 *
 * @interface IBook
 * @exports
 */
export default interface IBook {
  /**
   * The name of the App.
   *
   * @type {string}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#framework
   */
  readonly FRAMEWORK: string

  /**
   * The implementation of IBookServer.
   *
   * @type {IBookServer}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#server
   */
  readonly server: IBookServer

  /**
   * The implementation of IBookMetrics.
   *
   * @type {IBookMetrics}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#serverMetrics
   */
  readonly metrics: IBookMetrics

  /**
   * The implementation of IBookStorybook.
   *
   * @type {IBookStorybook}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#storybook
   */
  readonly storybook: IBookStorybook

  /**
   * The implementation of IBookFeatureFlags.
   *
   * @type {IBookFeatureFlags}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#flags
   */
  readonly flags: IBookFeatureFlags

  /**
   * The environment.
   *
   * @type {EnvironmentTypes}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#environment
   */
  readonly environment: EnvironmentTypes

  /**
   * The environment.
   *
   * @type {boolean}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#isBuilt
   */
  readonly isBuilt: boolean

  /**
   * The node version.
   *
   * @type {boolean}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#nodeVersion
   */
  readonly nodeVersion: string

  /**
   * The process id.
   *
   * @type {boolean}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#processId
   */
  readonly processId: number

  /**
   * The platform.
   *
   * @type {boolean}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#platform
   */
  readonly platform: string

  /**
   * The working path.
   *
   * @type {boolean}
   * @memberof IBook
   * @see https://resistjs.dev/docs/settings#workingPath
   */
  readonly workingPath: string
}
