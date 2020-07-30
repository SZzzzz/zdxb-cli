#!/usr/bin/env node

/* eslint-disable @typescript-eslint/no-var-requires */
const program = require('commander');
const minimist = require('minimist');
const chalk = require('chalk');

program.version(require('../package').version).usage('<command> [options]');

program
  .command('create <app-name>')
  .description('根据项目模板创建一个新项目')
  .action((name, cmd) => {
    const options = cleanArgs(cmd);
    if (minimist(process.argv.slice(3))._.length > 1) {
      console.log(
        chalk.yellow(
          '\n Info: 参数超过一个时，只有第一个参数会被作为项目创建的目录，其余参数都将被忽略'
        )
      );
    }
    require('../lib/create').default(name, options);
  });

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

function cleanArgs(cmd) {
  const args = {};
  cmd.options.forEach((o) => {
    const key = camelize(o.long.replace(/^--/, ''));
    // if an option is not present and Command has a method with the same name
    // it should not be copied
    if (typeof cmd[key] !== 'function' && typeof cmd[key] !== 'undefined') {
      args[key] = cmd[key];
    }
  });
  return args;
}

program.parse(process.argv);
