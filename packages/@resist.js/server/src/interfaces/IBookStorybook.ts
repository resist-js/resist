// @final
//
// NOTE: Do not make changes here without approval.

/**
 * IBookStorybook interface.
 *
 * @interface IBookStorybook
 * @exports
 */
export default interface IBookStorybook {
  /**
   * Is Storybook enabled?
   *
   * @type {boolean}
   * @memberof IBookStorybook
   * @see https://resistjs.dev/doc/settings#storybook
   */
  readonly enabled: boolean

  /**
   * The URL for the Storybook instance.
   *
   * @type {string}
   * @memberof IBookStorybook
   * @see https://resistjs.dev/doc/settings#storybookUrl
   */
  readonly url: string
}
