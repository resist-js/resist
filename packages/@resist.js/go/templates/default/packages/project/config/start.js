#!/usr/bin/env node

// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable no-console */

import { spawn, execSync } from 'node:child_process'

import { Listr } from 'listr2'

/**
 * Spawn a child process.
 *
 * @param {!string} command The command to spawn.
 * @param {!string[]} args Arguments for @command.
 * @param {!object} env Environvment variables.
 * @param {!object} task Listr task.
 * @returns {!Promise<void>} Resolvable promise.
 */
const Launch = (command, args, env, task) => {
  let log = ''

  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      env: { ...env, ...process.env },
      stdio: !command.includes('docker') ? [process.stdin, process.stdout, process.stderr] : ['pipe', 'pipe', 'pipe'],
    })

    const dataHandler = data => {
      log += data.toString()

      if (log.includes('Creating ')) task.output = 'Creating cluster, almost done...'
      else if (log.includes('Pulling kibana')) task.output = 'Setting up kibana...'
      else if (log.includes('Pulling exceptionless_jobs')) task.output = 'Setting up exceptionless...'
      else if (log.includes('Pulling exceptionless')) task.output = 'Setting up exceptionless...'
      else if (log.includes('Pulling elasticsearch')) task.output = 'Setting up elasticsearch...'
      else if (log.includes('Pulling mail')) task.output = 'Setting up mail...'
      else if (log.includes('Pulling redis')) task.output = 'Setting up cache...'
      else if (log.includes('Pulling flags')) task.output = 'Setting up feature flags...'
      else if (log.includes('Pulling flags_db')) task.output = 'Setting up feature flags...'
      else if (log.includes('Pulling uptime')) task.output = 'Setting up uptime...'
      else if (log.includes('exporting to image')) task.output = 'Exporting...'
      else if (log.includes('pnpm run build')) task.output = 'Building...'
      else if (log.includes('COPY --chown=node:node . .')) task.output = 'Copying project...'
      else if (log.includes('server@latest')) task.output = 'Installing server...'
      else if (log.includes('RUN pnpm i')) task.output = 'Installing dependencies...'
      else if (log.includes('package.json')) task.output = 'Copying package.json...'
      else if (log.includes('@pnpm/self')) task.output = 'Installing pnpm...'
      else if (log.includes('Creating volume')) task.output = 'Creating volume...'
      else if (log.includes('from Dockerfile')) task.output = 'Loading...'
    }

    child.stderr?.on('data', dataHandler)
    child.stdout?.on('data', dataHandler)

    child.once('exit', code => {
      if (code === 0) {
        resolve(undefined)
      } else {
        reject(new Error(`Exited with error code: ${code}`))
      }
    })

    child.once('error', err => {
      reject(err)
    })
  })
}

/**
 * Entry Point.
 */
async function main() {
  const APP_NAME = process.argv[2]
  const CWD = process.argv[3] || process.cwd()

  if (!APP_NAME) {
    new Error(`A project name must be provided.`)
    return
  }

  await Launch(`resist`, [`install`, APP_NAME, CWD])

  new Listr(
    [
      {
        title: `Setting up ${APP_NAME}`,
        task: async (ctx, task) => {
          await Launch(
            'docker-compose',
            [
              '--log-level',
              'DEBUG',
              '-f',
              `${CWD}/packages/project/config/docker-compose.yml`,
              '-p',
              APP_NAME,
              'up',
              '-d',
              '--build',
            ],
            {
              DOCKER_BUILDKIT: 1,
              APP_NAME: APP_NAME,
              CWD: `${CWD}/packages/project`,
              PORT_ELASTIC: 9200,
              PORT_ELASTIC_SSL: 9300,
              PORT_KIBANA: 5601,
              PORT_REDIS: 6379,
              PORT_EXCEPTION_SSL: 5001,
              PORT_EXCEPTION: 5000,
              PORT_FLAGS: 4003,
              PORT_UPTIME: 4002,
              PORT_STORYBOOK: 6006,
              PORT_SERVER_DEV: 3000,
              PORT_DEV_DEBUG: 3001,
              PORT_SERVER_PROD: 4000,
              PORT_PROD_DEBUG: 4001,
              PORT_HMR: 24678,
            },
            task,
          )

          task.output = 'Ready!'
          execSync('sleep 5 && python -m webbrowser https://localhost:4000')
        },
      },
    ],
    {},
  ).run()
}

main()
