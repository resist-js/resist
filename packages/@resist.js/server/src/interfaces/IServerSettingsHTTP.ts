// @final
//
// NOTE: Do not make changes here without approval.

/**
 * IServerSettingsHTTP interface.
 *
 * @interface IServerSettingsHTTP
 * @exports
 */
export default interface IServerSettingsHTTP {
  /**
   * Allow HTTP/1 requests?
   *
   * @type {boolean}
   * @memberof IServerSettingsHTTP
   */
  allowHTTP1: boolean

  /**
   * Raw key data.
   *
   * @type {Buffer}
   * @memberof IServerSettingsHTTP
   */
  key: Buffer

  /**
   * Raw certificate data.
   *
   * @type {Buffer}
   * @memberof IServerSettingsHTTP
   */
  cert: Buffer
}
