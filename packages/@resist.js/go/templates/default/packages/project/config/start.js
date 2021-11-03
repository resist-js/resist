#!/usr/bin/env node

// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable no-console */

import { execSync } from 'node:child_process'

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
    } catch (error) {
      return false
    }
  }

  Launch(`resist install ${APP_NAME} ${CWD}`)

  if (
    Launch(
      `APP_NAME=${APP_NAME} CWD=${CWD} PORT_ELASTIC=9200 PORT_ELASTIC_SSL=9300 PORT_KIBANA=5601 PORT_REDIS=6379 PORT_EXCEPTION_SSL=5001 PORT_EXCEPTION=5000 PORT_FLAGS=4003 PORT_UPTIME=4002 PORT_STORYBOOK=6006 PORT_SERVER_DEV=3000 PORT_DEV_DEBUG=3001 PORT_SERVER_PROD=4000 PORT_PROD_DEBUG=4001 PORT_HMR=24678 docker-compose --log-level WARNING -f ./config/docker-compose.yml up -d --build`,
    )
  ) {
    console.log('✔ Ready!')
    Launch('sleep 5 && python -m webbrowser https://localhost:4000')
  } else {
    console.log(`✗ Something went wrong. Please check the log "first-startup.log"`)
  }
}

main()
