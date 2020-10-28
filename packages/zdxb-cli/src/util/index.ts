import { Question } from 'inquirer';
import { configList } from '../config';
import chalk from 'chalk';
import { spawn } from 'child_process';

export function getPrompts(): Question[] {
  const q: Question[] = configList.reduce<Question[]>((p, c) => {
    return p.concat(c.subQuestions);
  }, []);
  q.unshift({
    name: 'pkg',
    type: 'list',
    message: '请选择一个项目模板',
    choices: configList.map((t) => ({
      name: t.desc,
      value: t.pkg,
    })),
  });
  return q;
}

export function install(
  root: string,
  useYarn: boolean,
  dependencies: string[],
  verbose: boolean,
  isOnline: boolean
): Promise<void> {
  return new Promise((resolve, reject) => {
    let command: string;
    let args: string[];
    if (useYarn) {
      command = 'yarnpkg';
      args = ['add', '--exact'];
      if (!isOnline) {
        args.push('--offline');
      }
      [].push.apply(args, dependencies);

      // Explicitly set cwd() to work around issues like
      // https://github.com/facebook/create-react-app/issues/3326.
      // Unfortunately we can only do this for Yarn because npm support for
      // equivalent --prefix flag doesn't help with this issue.
      // This is why for npm, we run checkThatNpmCanReadCwd() early instead.
      args.push('--cwd');
      args.push(root);

      if (!isOnline) {
        console.log(chalk.yellow('You appear to be offline.'));
        console.log(chalk.yellow('Falling back to the local Yarn cache.'));
        console.log();
      }
    } else {
      command = 'npm';
      args = ['install', '--save', '--save-exact', '--loglevel', 'error'].concat(dependencies);
    }

    if (verbose) {
      args.push('--verbose');
    }

    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code !== 0) {
        reject({
          command: `${command} ${args.join(' ')}`,
        });
        return;
      }
      resolve();
    });
  });
}
