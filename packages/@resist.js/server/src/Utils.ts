// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable @typescript-eslint/no-var-requires */

const util = require('util')
const urlExists = util.promisify(require('url-exists'))

import { randomUUID } from 'crypto'
import { existsSync, readFileSync } from 'fs'

import path from 'path'

/**
 * Return whether @array is a valid Array type.
 *
 * @exports
 * @param {*} array The object to check.
 * @returns {boolean} True if @array is an Array.
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types, @typescript-eslint/no-explicit-any
export function IsArray(array: any): boolean {
  return array && Array.isArray(array)
}

/**
 * Returns whether @file exists.
 *
 * @exports
 * @param {!string} file The relative path of the file in relation to the project directory.
 * @returns {boolean} True if @file exists.
 */
export function FileExists(file: string): boolean {
  return existsSync(path.join(path.resolve(), '', file))
}

/**
 * Returns whether @path exists.
 *
 * @exports
 * @param {!string} path The absolute path to check.
 * @returns {boolean} True if @path exists.
 */
export function PathExists(path: string): boolean {
  return existsSync(path)
}

/**
 * Returns a raw Buffer if @file exists.
 *
 * @exports
 * @param {!string} file The relative path of the file in relation to the project director to read.
 * @param {boolean} absolute Use absolute path?
 * @returns {!Buffer} Raw file Buffer.
 */
export function ReadFile(file: string, absolute?: boolean): Buffer {
  return readFileSync(absolute ? file : path.join(path.resolve(), '', file))
}

/**
 * Returns a String indicating the estimated memory useage of the server process.
 *
 * @exports
 * @returns {!string} Estimated server memory useage expressed in MB.
 */
export function MemoryUsage(): string {
  const value = process.memoryUsage().heapUsed / 1024 / 1024

  return (Math.round(value * 100) / 100).toString()
}

/**
 * Returns a UUID.
 *
 * @exports
 * @returns {!string} A UUID.
 */
export function UUID(): string {
  return randomUUID()
}

/**
 * Returns whether an external URL is available.
 *
 * @param {!string} url The URL to check.
 * @exports
 * @returns {Promise<boolean>} Whether URL is available.
 */
export async function IsUp(url: string): Promise<boolean> {
  return await urlExists(url)
}
