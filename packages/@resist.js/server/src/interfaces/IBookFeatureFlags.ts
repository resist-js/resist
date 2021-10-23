// @final
//
// NOTE: Do not make changes here without approval.

/**
 * IBookFeatureFlags interface.
 *
 * @interface IBookFeatureFlags
 * @exports
 */
export default interface IBookFeatureFlags {
  /**
   * Are Feature Flags enabled?
   *
   * @type {boolean}
   * @memberof IBookFeatureFlags
   * @see https://resistjs.dev/doc/settings#flags
   */
  readonly enabled: boolean

  /**
   * The url for the Feature Flags instance.
   *
   * @type {string}
   * @memberof IBookFeatureFlags
   * @see https://resistjs.dev/doc/settings#flagsUrl
   */
  readonly url: string
}
