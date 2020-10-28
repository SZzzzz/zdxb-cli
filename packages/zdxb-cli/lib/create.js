"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
const util_1 = require("./util");
const Installer_1 = __importDefault(require("./Installer"));
async function create(projectName, options) {
    const cwd = process.cwd();
    const inCurrent = projectName === '.';
    const name = inCurrent ? path_1.default.relative('../', cwd) : projectName;
    const targetDir = path_1.default.resolve(cwd, projectName || '.');
    const result = validate_npm_package_name_1.default(name);
    if (!result.validForNewPackages) {
        console.error(chalk_1.default.red(`Invalid project name: "${name}"`));
        result.errors &&
            result.errors.forEach((err) => {
                console.error(chalk_1.default.red.dim('Error: ' + err));
            });
        result.warnings &&
            result.warnings.forEach((warn) => {
                console.error(chalk_1.default.red.dim('Warning: ' + warn));
            });
        process.exit(1);
    }
    if (fs_extra_1.default.existsSync(targetDir)) {
        const { ok } = await inquirer_1.default.prompt([
            {
                name: 'ok',
                type: 'confirm',
                message: `目录已存在，要在这个目录创建项目吗？${chalk_1.default.redBright('这将会清空该目录')}!`,
            },
        ]);
        if (!ok) {
            return;
        }
        else {
            fs_extra_1.default.removeSync(targetDir);
        }
    }
    const pkg = options.tpl || (await inquirer_1.default.prompt(util_1.getPrompts())).pkg;
    fs_extra_1.default.mkdirpSync(projectName);
    const installer = new Installer_1.default(targetDir, { pkg });
    await installer.installTpl();
    await installer.initProject();
}
async function default_1(projectName, options) {
    try {
        await create(projectName, options);
    }
    catch (error) {
        console.error(error);
        process.exit(1);
    }
}
exports.default = default_1;
