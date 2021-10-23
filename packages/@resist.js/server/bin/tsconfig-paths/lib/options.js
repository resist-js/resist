'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var minimist = require('minimist')
var argv = minimist(process.argv.slice(2), {
  string: ['project'],
  alias: {
    project: ['P'],
  },
})
var project = argv && argv.project
exports.options = {
  cwd: project || process.cwd(),
}
