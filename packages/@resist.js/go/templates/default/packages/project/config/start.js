#!/usr/bin/env node

// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable no-console */

import { execSync } from 'child_process'

/**
 * Entry Point.
 */
async function main() {
  const APP_NAME = process.argv[2]
  const CWD = process.cwd()

  const Launch = command => {
    try {
      execSync(command)
      return true
    } catch (e) {
      return false
    }
  }

  Launch(`resist install ${APP_NAME} ${CWD}`)

  if (
    Launch(
      `APP_NAME=${APP_NAME} CWD=${CWD} PORT_STORYBOOK=6006 PORT_SERVER_DEV=3000 PORT_DEV_DEBUG=3001 PORT_SERVER_PROD=4000 PORT_PROD_DEBUG=4001 PORT_HMR=24678 docker-compose --log-level WARNING -f ./config/docker-compose.yml up -d --build`,
    )
  ) {
    console.log('✔ Ready!')
    Launch('sleep 5 && python -m webbrowser https://localhost:4000')
  } else {
    console.log(`✗ Something went wrong. Please check the log "first-startup.log"`)
  }
}

main()
