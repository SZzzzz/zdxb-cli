import path from 'path';
import inquirer from 'inquirer';
import chalk from 'chalk';
import fs from 'fs-extra';
import validateProjectName from 'validate-npm-package-name';
import { getPrompts } from './util';
import Installer from './Installer';

type Options = {
  tpl?: string;
};

async function create(projectName: string, options: Options) {
  const cwd: string = process.cwd();
  const inCurrent: boolean = projectName === '.';
  const name = inCurrent ? path.relative('../', cwd) : projectName;
  const targetDir = path.resolve(cwd, projectName || '.');

  const result = validateProjectName(name);
  if (!result.validForNewPackages) {
    console.error(chalk.red(`Invalid project name: "${name}"`));
    result.errors &&
      result.errors.forEach((err) => {
        console.error(chalk.red.dim('Error: ' + err));
      });
    result.warnings &&
      result.warnings.forEach((warn) => {
        console.error(chalk.red.dim('Warning: ' + warn));
      });
    process.exit(1);
  }

  if (fs.existsSync(targetDir)) {
    const { ok } = await inquirer.prompt<{ ok: boolean }>([
      {
        name: 'ok',
        type: 'confirm',
        message: `目录已存在，要在这个目录创建项目吗？${chalk.redBright('这将会清空该目录')}!`,
      },
    ]);
    if (!ok) {
      return;
    } else {
      fs.removeSync(targetDir);
    }
  }

  const pkg = options.tpl || (await inquirer.prompt<{ pkg: string }>(getPrompts())).pkg;
  fs.mkdirpSync(projectName);
  const installer = new Installer(targetDir, { pkg });
  await installer.installTpl();
  await installer.initProject();
}

export default async function (projectName: string, options: Options): Promise<void> {
  try {
    await create(projectName, options);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
