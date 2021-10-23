// @final
//
// NOTE: Do not make changes here without approval.

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import fs from 'fs'
import path from 'path'
import { fileURLToPath, URL } from 'url'
import { exec, execSync } from 'child_process'

/**
 * The absolute path of the current working directory.
 *
 * @type {!string}
 * @exports
 */
export const CWD = process.argv[2] || '.'

/**
 * The name of the current working directory.
 *
 * @type {!string}
 * @exports
 */
export const CWDName = path.basename(path.resolve(CWD))

/**
 * Check if the current working directory is empty, if it doesn't
 * exist then create it. If it exists, prompt to continue.
 *
 * @exports
 * @param {!Function} cb Callback function with a return of {value: true/false}.
 * @returns {Promise} Resolved promise.
 */
export async function IsCWDEmpty(cb) {
  if (fs.existsSync(CWD)) {
    if (fs.readdirSync(CWD).length > 0) {
      const response = await cb()

      if (!response.value) {
        process.exit(1)
      }
    }
  } else {
    mkdirp(CWD)
  }
}

/**
 * Create a directory, including all paths leading up to it.
 *
 * @exports
 * @param {!string} dir The absolute path to the directory to create.
 */
export function mkdirp(dir) {
  try {
    fs.mkdirSync(dir, { recursive: true })
  } catch (e) {
    if (e.code !== 'EEXIST') throw e
  }
}

/**
 * Recursively remove the contents (folders and files) from @path.
 *
 * @exports
 * @param {!string} path The absolute path of the directory.
 */
export function rimraf(path) {
  ;(fs.rmSync || fs.rmdirSync)(path, { recursive: true, force: true })
}

/**
 * Copies the contents of @from to @to.
 *
 * @exports
 * @param {!string} from The path to move from.
 * @param {!string} to The path to move to.
 */
export function copy(from, to) {
  if (!fs.existsSync(from)) return

  const stats = fs.statSync(from)

  if (stats.isDirectory()) {
    fs.readdirSync(from).forEach(file => {
      copy(path.join(from, file), path.join(to, file))
    })
  } else {
    mkdirp(path.dirname(to))
    fs.copyFileSync(from, to)
  }
}

/**
 * Returns whether @s is a valid URL and matches one or more of the @protocols.
 *
 * @exports
 * @param {!string} s The URL string.
 * @param {string[]} [protocols=['https']] A string array of valid protocols.
 * @returns {!boolean} True or false based on whether @s is a valid URL.
 */
export function IsURL(s, protocols = ['https']) {
  try {
    const url = new URL(s)
    return protocols
      ? url.protocol
        ? protocols.map(x => `${x.toLowerCase()}:`).includes(url.protocol) && s.includes('.')
        : false
      : true
  } catch (err) {
    return false
  }
}

/**
 * Returns whether @s is a valid Repository URL (githib, gitlab, gist or gitbucket).
 *
 * @exports
 * @param {!string} s The string to check.
 * @returns {!boolean} True or false based on whether @s is valid.
 */
export function IsRepo(s) {
  return s.startsWith('github:') || s.startsWith('gitlab:') || s.startsWith('gist:') || s.startsWith('bitbucket:')
}

/**
 * Returns the corrected path.
 *
 * @exports
 * @param {!string} path The relative path.
 * @param {!string} metaURL import.meta.url from callee.
 * @returns {!string} The corrected path.
 */
export function dist(path, metaURL) {
  return fileURLToPath(new URL(`../${path}`, metaURL).href)
}

/**
 * Copies a template directory into the current working directory and
 * creates a package.json.
 *
 * @exports
 * @param {!string} cwd The current working directory.
 * @param {!object} data A propery constructed package.json object.
 * @param {!string} metaURL import.meta.url from callee.
 */
export function CopyTemplate(cwd, data, metaURL) {
  const dir = dist(`templates/default`, metaURL)

  copy(dir, cwd)

  fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(data))
}

/**
 * Executes a shell command to determine if the docker daemon is installed and running.
 *
 * @exports
 * @returns {!boolean} Returns whether Docker is running.
 */
export function IsDockerRunning() {
  try {
    execSync('docker info')
  } catch (e) {
    return false
  }
  return true
}

/**
 * Executes a shell command.
 *
 * @exports
 * @param {!string} command The command to execute.
 */
export function Launch(command) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      fs.appendFileSync(`${CWD}/first-startup.log`, error.message)
    } else if (stderr) {
      fs.appendFileSync(`${CWD}/first-startup.log`, stderr)
    } else {
      fs.appendFileSync(`${CWD}/first-startup.log`, stdout)
    }
  })
}
