"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const os_1 = __importDefault(require("os"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const execa_1 = __importDefault(require("execa"));
const module_1 = require("./util/module");
class Installer {
    constructor(targetDir, answers) {
        this.targetDir = targetDir;
        this.projectTemplate = answers.pkg;
    }
    async installTpl() {
        const isLocal = !!process.env.isLocal;
        const name = path_1.default.basename(this.targetDir);
        const pkg = {
            name,
            version: '0.0.1',
        };
        fs_extra_1.default.writeFileSync(path_1.default.join(this.targetDir, 'package.json'), JSON.stringify(pkg, null, 2) + os_1.default.EOL);
        const tplPackage = isLocal && !this.projectTemplate.startsWith('file:')
            ? `file:${path_1.default.resolve(__dirname, '../../', 'zdxb-' + this.projectTemplate.split('/')[1])}`
            : this.projectTemplate;
        await this.yarnAdd([tplPackage], true);
    }
    async initProject() {
        const init = module_1.loadModule(`${this.projectTemplate}/scripts/init`, this.targetDir);
        init(this.targetDir);
    }
    yarnAdd(depList, isDev) {
        return new Promise((resolve, reject) => {
            const command = 'yarnpkg';
            const args = ['add', '--exact', ...depList];
            if (isDev) {
                args.push('--dev');
            }
            const child = execa_1.default(command, args, {
                stdio: 'inherit',
                cwd: this.targetDir,
            });
            child.on('close', (code) => {
                if (code !== 0) {
                    reject({
                        command: `${command} ${args.join(' ')}`,
                    });
                }
                else {
                    resolve();
                }
            });
        });
    }
    run(command, args) {
        if (!args) {
            [command, ...args] = command.split(/\s+/);
        }
        return execa_1.default(command, args, { cwd: this.targetDir });
    }
}
exports.default = Installer;
