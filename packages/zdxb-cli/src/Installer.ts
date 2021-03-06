import path from 'path';
import os from 'os';
import fs from 'fs-extra';
import execa from 'execa';
import { loadModule } from './util/module';

export default class Installer {
  projectTemplate: string;

  constructor(public targetDir: string, answers: { pkg: string }) {
    this.projectTemplate = answers.pkg;
  }

  async installTpl(): Promise<void> {
    const isLocal = !!process.env.isLocal;
    const name = path.basename(this.targetDir);
    const pkg = {
      name,
      version: '0.0.1',
    };
    fs.writeFileSync(
      path.join(this.targetDir, 'package.json'),
      JSON.stringify(pkg, null, 2) + os.EOL
    );
    const tplPackage =
      isLocal && !this.projectTemplate.startsWith('file:')
        ? `file:${path.resolve(__dirname, '../../', 'zdxb-' + this.projectTemplate.split('/')[1])}`
        : this.projectTemplate;
    await this.yarnAdd([tplPackage], true);
  }

  async initProject(): Promise<void> {
    type InitFunction = (appPath: string) => void;
    const init: InitFunction = loadModule(`${this.projectTemplate}/scripts/init`, this.targetDir);
    init(this.targetDir);
  }

  private yarnAdd(depList: string[], isDev: boolean) {
    return new Promise((resolve, reject) => {
      const command = 'yarnpkg';
      const args = ['add', '--exact', ...depList];
      if (isDev) {
        args.push('--dev');
      }
      const child = execa(command, args, {
        stdio: 'inherit',
        cwd: this.targetDir,
      });
      child.on('close', (code) => {
        if (code !== 0) {
          reject({
            command: `${command} ${args.join(' ')}`,
          });
        } else {
          resolve();
        }
      });
    });
  }

  run(command, args) {
    if (!args) {
      [command, ...args] = command.split(/\s+/);
    }
    return execa(command, args, { cwd: this.targetDir });
  }
}
