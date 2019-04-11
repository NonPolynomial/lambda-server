#!/usr/bin/env node
const lambda = require('../lib');

const yargs = require('yargs')
  .usage('$0 [directory]', '', (y) => {
    y
      .positional('directory', {
        type: 'string',
        default: process.cwd(),
      });
  })
  .options({
    p: {
      desc: 'Port to listen',
      alias: 'port',
      type: 'number',
      demand: true,
    }
  })
  .help()
  .argv;

lambda(yargs.directory, yargs.port);
