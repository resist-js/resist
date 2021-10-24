// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable @typescript-eslint/no-explicit-any */

import { createReadStream, createWriteStream, mkdirSync, rmSync, statSync } from 'fs'
import { join } from 'path'
import { pipeline } from 'stream'
import glob from 'tiny-glob'
import { promisify } from 'util'
import zlib from 'zlib'

const pipe = promisify(pipeline)

// eslint-disable-next-line jsdoc/require-param
/**
 * Svelte adapter for building.
 *
 * @exports
 * @param {!object} [{ out = 'build', assets = 'assets' }={}]
 * @returns {!object} Adapter instance.
 */
export default function ({ out = 'build', assets = 'assets' } = {}) {
  /** @type {import('@resistjs/svelte-kit').Adapter} */
  return {
    name: '@resistjs/svelte-adapter-resistjs',

    async adapt({ utils }) {
      utils.rimraf(out)

      utils.log.minor(`Copying assets to ${assets}`)
      const static_directory = join(out, assets)
      utils.copy_client_files(static_directory)
      utils.copy_static_files(static_directory)

      utils.log.minor('Compressing assets')
      await compress(static_directory)

      utils.log.minor('Copying server')
      utils.copy_server_files(out)

      try {
        mkdirSync(`${out}/prerendered`, { recursive: true })
      } catch (error) {
        // Not important
      }

      try {
        utils.log.minor('Prerendering static pages')
        await utils.prerender({
          dest: `${out}/prerendered`,
        })

        utils.log.minor('Compressing prerendered pages')
        await compress(`${out}/prerendered`)
      } catch (error) {
        // Not important
      }

      utils.copy(`${out}/app.js`, `${out}/app.mjs`)

      try {
        rmSync(`${out}/app.js`)
      } catch (error) {
        // Not important
      }
    },
  }
}

/**
 * Compress resources.
 *
 * @param {string} directory Path.
 */
async function compress(directory) {
  const files = await glob('**/*.{html,js,json,css,svg,xml}', {
    cwd: directory,
    dot: true,
    absolute: true,
    filesOnly: true,
  })

  await Promise.all(files.map(file => Promise.all([compress_file(file, 'gz'), compress_file(file, 'br')])))
}

/**
 * Compress files.
 *
 * @param {string} file The file.
 * @param {'gz' | 'br'} format The format (gz, br).
 */
async function compress_file(file, format = 'gz') {
  const compress =
    format == 'br'
      ? zlib.createBrotliCompress({
          params: {
            [zlib.constants.BROTLI_PARAM_MODE]: zlib.constants.BROTLI_MODE_TEXT,
            [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
            [zlib.constants.BROTLI_PARAM_SIZE_HINT]: statSync(file).size,
          },
        })
      : zlib.createGzip({ level: zlib.constants.Z_BEST_COMPRESSION })

  const source = createReadStream(file)
  const destination = createWriteStream(`${file}.${format}`)

  await pipe(source, compress, destination)
}
