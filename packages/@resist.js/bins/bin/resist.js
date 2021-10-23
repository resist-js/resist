#!/usr/bin/env node

/* eslint-disable no-console, sonarjs/no-nested-template-literals, sonarjs/cognitive-complexity */

// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

import fs from 'fs'

import { homedir } from 'os'

import { execSync } from 'child_process'

import { IsDockerRunning } from '@resistjs/utils'

import prompts from 'prompts'
import { bold, cyan, green, red } from 'kleur/colors'

/** @type {!string} */
const HOME = homedir()

/** @type {!string} */
const CONFIG = `${HOME}/.resist-containers.json`

/** @type {!string} */
const URL = 'https://resistjs.dev/'

/** @type {!object<string>} */
const messages = {
  disclaimer: `
  ${bold(cyan('Welcome to resist.js ❄️'))}
  ${bold(red('This is beta software; expect bugs and missing features.'))}
  If you encounter a problem, open an issue on ${cyan(`${URL}docs/issues`)} if none exists already.
  `,
  dockerFail: bold(
    red(
      `\nDocker must be installed and running, please install and start it, then try again. (https://docs.docker.com/get-docker)`,
    ),
  ),
}

/**
 * Entry Point.
 */
async function main() {
  const command = process.argv[2]

  console.log(messages.disclaimer)

  if (!command) {
    const CHOICES = await prompts({
      type: 'select',
      name: 'value',
      initial: 0,
      message: 'What do you want to do?',
      choices: [
        { title: 'Start Project', value: 'start' },
        { title: 'Stop Project', value: 'stop' },
        { title: 'Uninstall Project', value: 'sweep' },
        { title: 'Uninstall resist.js', value: 'uninstall' },
        { title: 'Exit', value: 'exit' },
      ],
    })

    if (CHOICES.value === 'start' || CHOICES.value === 'stop') {
      if (!IsDockerRunning()) {
        console.log(messages.dockerFail)
        return
      }
    } else if (CHOICES.value === 'exit') return

    run(CHOICES.value)
  } else {
    run(command)
  }
}

/**
 * Command handler.
 *
 * @param {!string} choice The choice.
 */
async function run(choice) {
  const container = process.argv[3]

  const Launch = command => {
    try {
      execSync(command)
      return true
    } catch (e) {
      return false
    }
  }

  if (choice === 'install' && container && process.argv[4]) {
    let data
    try {
      data = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'))
    } catch (e) {
      // Not important
    }

    if (!data) data = {}

    data[container] = process.argv[4]

    fs.writeFileSync(CONFIG, JSON.stringify(data))

    console.log(bold(green(`✔ ${container} has been installed.`)))
  } else if (choice === 'uninstall') {
    let data
    try {
      data = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'))
    } catch (e) {
      // Not important
    }

    if (!data) {
      console.log(bold(red(`✗ There were no containers to stop.`)))
    } else {
      Object.keys(data).forEach(container => {
        if (Launch(`docker stop ${container}`)) {
          console.log(bold(green(`✔ ${container} has been stopped and is no longer running.`)))
        } else {
          console.log(bold(red(`✗ ${container} was not be stopped as it is not running.`)))
        }

        const path = data[container]

        if (
          !Launch(
            `APP_NAME=${container} CWD=$(builtin pwd) PORT_STORYBOOK=6006 PORT_SERVER_DEV=3000 PORT_DEV_DEBUG=3001 PORT_SERVER_PROD=4000 PORT_PROD_DEBUG=4001 PORT_HMR=24678 docker-compose --log-level WARNING -f ${path}/config/docker-compose.yml down --rmi all -v --remove-orphans`,
          )
        ) {
          console.log(bold(red(`✗ ${container} was not removed as it doesn't exist.`)))
        }

        try {
          fs.rmdirSync(`${path}/config`, { recursive: true, force: true })
        } catch (e) {
          // Not important
        }
      })

      try {
        fs.rmSync(`${HOME}/.resist-containers.json`)
      } catch (e) {
        // Not important
      }

      if (Launch('pnpm uninstall -g @resistjs/bins')) {
        console.log(bold(green(`✔ @resistjs/bins was uninstalled.`)))
      }
      if (Launch('pnpm uninstall -g @resistjs/server')) {
        console.log(bold(green(`✔ @resistjs/server was uninstalled.`)))
      }
      if (Launch('pnpm uninstall -g @resistjs/conformances')) {
        console.log(bold(green(`✔ @resistjs/conformances was uninstalled.`)))
      }

      console.log(bold(green(`✔ @resistjs has been completely uninstalled.`)))
    }
  } else {
    let PROJECT_NAME = { value: container }

    if (!container) {
      PROJECT_NAME = await prompts({
        type: 'text',
        name: 'value',
        message: 'Name of your project?',
        validate: value => (value?.length !== 0 ? true : `You must provide a project name.`),
      })
    }
    if (!PROJECT_NAME.value) return

    if (choice === 'start') {
      let data
      try {
        data = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'))
      } catch (e) {
        // Not important
      }

      if (!data || !data[PROJECT_NAME.value]) {
        console.log(bold(red(`✗ There are no containers that can be started.`)))
      } else {
        const container = data[PROJECT_NAME.value]

        if (Launch(`cd ${container}/config && ./start.sh ${container}`)) {
          console.log(bold(green(`✔ ${PROJECT_NAME.value} is starting...`)))
        } else {
          console.log(bold(red(`✗ ${PROJECT_NAME.value} could not be started.`)))
        }
      }
    } else if (choice === 'stop') {
      if (Launch(`docker stop ${PROJECT_NAME.value}`)) {
        console.log(bold(green(`✔ ${PROJECT_NAME.value} is stopped and is no longer running.`)))
      } else {
        console.log(bold(red(`✗ ${PROJECT_NAME.value} could not be stopped as it is not running.`)))
      }
    } else if (choice === 'sweep') {
      const CONFIRMED = await prompts({
        type: 'confirm',
        name: 'value',
        message: 'Are you sure? This will only remove the files necessary from your project for resist.js to work.',
      })

      if (CONFIRMED.value) {
        let data
        try {
          data = JSON.parse(fs.readFileSync(CONFIG, 'utf-8'))
        } catch (e) {
          // Not important
        }

        if (!data) {
          console.log(bold(red(`✗ There were no containers to uninstall.`)))
        } else {
          const container = data[PROJECT_NAME.value]
          if (container) {
            if (Launch(`docker stop ${container}`)) {
              console.log(bold(green(`✔ ${container} has been stopped and is no longer running.`)))
            } else {
              console.log(bold(red(`✗ ${container} was not stopped as it is not running.`)))
            }

            if (
              !Launch(
                `APP_NAME=${PROJECT_NAME.value} CWD=$(builtin pwd) PORT_STORYBOOK=6006 PORT_SERVER_DEV=3000 PORT_DEV_DEBUG=3001 PORT_SERVER_PROD=4000 PORT_PROD_DEBUG=4001 PORT_HMR=24678 docker-compose --log-level WARNING -f ${container}/config/docker-compose.yml down --rmi all -v --remove-orphans`,
              )
            ) {
              console.log(bold(red(`✗ ${PROJECT_NAME.value} was not removed as it doesn't exist.`)))
            }

            try {
              fs.rmdirSync(`${container}/config`, { recursive: true, force: true })
            } catch (e) {
              // Not important
            }
          }
        }

        console.log(bold(green(`✔ ${PROJECT_NAME.value} has been uninstalled.`)))
      }
    }
  }
}

main()
