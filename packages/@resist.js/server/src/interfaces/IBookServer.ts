// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import type IBookServerSettings from '$interfaces/IBookServerSettings'
import type IHeader from '$interfaces/IHeader'
import type IRedirects from '$interfaces/IRedirects'
import type IRewrites from '$interfaces/IRewrites'
import type IServerPluginRecord from '$interfaces/IServerPluginRecord'

/**
 * IBookServer interface.
 *
 * @interface IBookServer
 * @exports
 */
export default interface IBookServer {
  /**
   * Relative path to output from framework.
   *
   * @type {IHeader[]}
   * @memberof IBookServer
   */
  readonly build: string

  /**
   * The implementation of IHeader.
   *
   * @type {IHeader[]}
   * @memberof IBookServer
   * @see https://resistjs.dev/doc/headers
   */
  readonly headers: IHeader[]

  /**
   * The implementation of IRedirects.
   *
   * @type {IRedirects[]}
   * @memberof IBookServer
   * @see https://resistjs.dev/doc/redirects
   */
  readonly redirects: IRedirects[]

  /**
   * The implementation of IRewrites.
   *
   * @type {IRewrites[]}
   * @memberof IBookServer
   * @see https://resistjs.dev/doc/rewrites
   */
  readonly rewrites: IRewrites[]

  /**
   * The implementation of IServerPluginRecord.
   *
   * @type {IServerPluginRecord[]}
   * @memberof IBookServer
   */
  readonly plugins: IServerPluginRecord[]

  /**
   * Server Settings.
   *
   * @type {IBookServerSettings}
   * @memberof IBookServer
   */
  readonly settings: IBookServerSettings

  /**
   * Cookie Secret.
   *
   * @type {IBookServerSettings}
   * @memberof IBook
   * @see https://resistjs.dev/doc/settings#cookieSecret
   */
  readonly cookieSecret: string
}
