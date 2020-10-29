const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const chalk = require('chalk');
const execa = require('execa');
const merge = require('lodash.merge');
const copy = require('./copy');
const walk = require('./walk');

module.exports = async (appPath) => {
  const ownPath = path.dirname(require.resolve(path.join(__dirname, '..', 'package.json')));
  const appPackagePath = path.join(appPath, 'package.json');
  const appPackage = require(appPackagePath);

  // 复制模板
  const templatePath = path.join(ownPath, 'template');
  if (fs.existsSync(templatePath)) {
    walk(templatePath, (pathname) => {
      const relativePath = path.relative(templatePath, pathname);
      if (relativePath === 'package.json.tpl') {
        const tplPkg = JSON.parse(fs.readFileSync(pathname));
        delete tplPkg.name;
        delete tplPkg.version;
        merge(appPackage, tplPkg);
        fs.writeFileSync(path.join(appPackagePath), JSON.stringify(appPackage, null, 2) + os.EOL);
      } else {
        const targetPath = path.join(appPath, relativePath);
        fs.copySync(pathname, targetPath.endsWith('.tpl') ? targetPath.slice(0, -4) : targetPath);
      }
    });
  } else {
    console.error(`找不到模板目录: ${chalk.green(templatePath)}`);
    return;
  }

  // 初始化 git 仓库
  if (tryGitInit(appPath)) {
    console.log();
    console.log('git 仓库初始化完毕');
  }

  // 子问题
  await subQuestions(appPath);

  // 安装依赖
  await execa('yarnpkg', ['install'], { cwd: appPath, stdio: 'inherit' });
  console.log('依赖安装完成');
};

function isInGitRepository() {
  try {
    execSync('git rev-parse --is-inside-work-tree', { stdio: 'ignore' });
    return true;
  } catch (e) {
    return false;
  }
}

function tryGitInit(appPath) {
  try {
    execSync('git --version', { stdio: 'ignore', cwd: appPath });
    if (isInGitRepository()) {
      return false;
    }
    execSync('git init', { stdio: 'ignore', cwd: appPath });
    return true;
  } catch (e) {
    return false;
  }
}

async function subQuestions(appPath) {
  await copy(appPath);
}
