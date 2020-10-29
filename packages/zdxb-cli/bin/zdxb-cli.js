#!/usr/bin/env node
const program = require('commander');
const chalk = require('chalk');

program.version(require('../package').version).usage('<command> [options]');

program
  .command('create <app-name>')
  .description('根据项目模板创建一个新项目')
  .option('-t, --tpl <tpl>', '模板npm包')
  .action((name, cmd) => {
    const options = {
      tpl: cmd.tpl,
    };
    require('../lib/create').default(name, options);
  });

program.arguments('<cmd>').action((cmd) => {
  program.outputHelp();
  console.log(`  ` + chalk.red(`Unknown command ${chalk.yellow(cmd)}.`));
});

program.on('--help', () => {
  console.log();
  console.log(
    `  Run ${chalk.cyan(`zdxb-cli <command> --help`)} for detailed usage of given command.`
  );
  console.log();
});

program.parse(process.argv);

if (!process.argv.slice(2).length) {
  program.outputHelp();
}
