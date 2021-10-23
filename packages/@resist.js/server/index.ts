// @final
//
// NOTE: Do not make changes here without approval from @resist-js/core.

/* eslint-disable @typescript-eslint/no-var-requires */

import { ReadFile } from '$utils'

const yaml = require('js-yaml')

global.config = {
  ...yaml.load(ReadFile('book.yaml')),
  ...yaml.load(ReadFile('/usr/local/app/project/book.yaml', true)),
}

import Validator from '$burn/Validator'
import Server from '$burn/EntryPoint'

/**
 * 📗 What's happening?
 *
 * We run "Validator()" to validate all of the configuration used to start the * Server, notifying where there is missing/incorrect configuration.
 * If there are no issues, we trigger "Server()".
 */
Validator().then(Server)

export {}
