#!/usr/bin/env node

'use strict'

const meow = require('meow')
const cosmiconfig = require('cosmiconfig')
const explorer = cosmiconfig('thunder')
const bundle = require('./webpack.config')
const updateNotifier = require('update-notifier')
const pkg = require('./package.json')

const cli = meow(
  `
  Usage: thunder [option]
  Options:
    --help, -h        show usage information
    --version, -V     show the version text
    --watch, -w       equal to 'webpack mode=development --watch'
    --build, -p       equal to 'webpack mode=production'
    --host            set ftp host
    --username        set ftp username
    --password        set ftp password
    --path            set ftp path
`,
  {
    flags: {
      version: {
        type: 'boolean',
        alias: 'V'
      },
      help: {
        alias: 'h'
      },
      watch: {
        alias: 'w'
      },
      build: {
        alias: 'p'
      },
      host: {
        type: 'string'
      },
      username: {
        type: 'string'
      },
      password: {
        type: 'string'
      },
      path: {
        type: 'string'
      }
    },
    description: false
  }
)

updateNotifier({ pkg }).notify()

if (!Object.keys(cli.flags).length) {
  cli.showHelp()
  process.exit(0)
}

const result = explorer.searchSync()

let config = result ? result.config : {}

bundle(config, cli.flags)
