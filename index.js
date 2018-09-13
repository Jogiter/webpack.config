#!/usr/bin/env node

'use strict';

const meow = require('meow');
const cosmiconfig = require('cosmiconfig');
const explorer = cosmiconfig('thunder');
const bundle = require('./bundle');

const cli = meow(
    `
  Usage: thunder [flag]
  Options:
    --help, -h        show usage information
    --version, -V     show the version text
    --watch, -w       set webpack mode=development and open watch moode
    --build           set webpack mode=production
`,
    {
        flags: {
            version: {
                type: 'string',
                alias: 'V'
            },
            watch: {
                alias: 'w'
            }
        },
        description: false
    }
);

const result = explorer.searchSync();
if (!result) {
    console.log('thunder config file is not found! please check.');
    process.exit(0);
}

bundle(result.config, cli);
