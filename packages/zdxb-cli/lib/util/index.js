"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = require("child_process");
function getPrompts() {
    const q = config_1.configList.reduce((p, c) => {
        return p.concat(c.subQuestions);
    }, []);
    q.unshift({
        name: 'pkg',
        type: 'list',
        message: '请选择一个项目模板',
        choices: config_1.configList.map((t) => ({
            name: t.desc,
            value: t.pkg,
        })),
    });
    return q;
}
exports.getPrompts = getPrompts;
function install(root, useYarn, dependencies, verbose, isOnline) {
    return new Promise((resolve, reject) => {
        let command;
        let args;
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
                console.log(chalk_1.default.yellow('You appear to be offline.'));
                console.log(chalk_1.default.yellow('Falling back to the local Yarn cache.'));
                console.log();
            }
        }
        else {
            command = 'npm';
            args = ['install', '--save', '--save-exact', '--loglevel', 'error'].concat(dependencies);
        }
        if (verbose) {
            args.push('--verbose');
        }
        const child = child_process_1.spawn(command, args, { stdio: 'inherit' });
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
exports.install = install;
