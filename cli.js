#!/usr/bin/env node

'use strict';

const meow = require('meow');
const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig('thunder');
const bundle = require('./');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

const cli = meow(
    `
  Usage: thunder [flag]
  Options:
    --help, -h        show usage information
    --version, -V     show the version text
    --watch, -w       equal to 'webpack mode=development --watch'
    --build           equal to 'webpack mode=production'
`, {
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
            }
        },
        description: false
    }
);

updateNotifier({pkg}).notify();

if (!Object.keys(cli.flags).length) {
    cli.showHelp();
    process.exit(0);
}

const result = explorer.searchSync();
if (!result) {
    console.log('thunder config file is not found, please check!');
    process.exit(0);
}

bundle(result.config, cli);
