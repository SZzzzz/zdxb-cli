const fs = require('fs-extra');
const path = require('path');
const os = require('os');
const { execSync } = require('child_process');
const chalk = require('chalk');
const execa = require('execa');
const merge = require('lodash.merge');
const copy = require('./copy');

module.exports = async (appPath) => {
  const ownPath = path.dirname(require.resolve(path.join(__dirname, '..', 'package.json')));
  const appPackage = require(path.join(appPath, 'package.json'));
  const pkg = require('./pkg');
  merge(appPackage, pkg);

  fs.writeFileSync(
    path.join(appPath, 'package.json'),
    JSON.stringify(appPackage, null, 2) + os.EOL
  );

  // 复制模板
  const dotFileList = [];
  const templatePath = path.join(ownPath, 'template');
  if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath, {filter: (src, dest) => {
      if (path.basename(dest).startsWith('_dot_')) {
        dotFileList.push(dest);
      }
      return true;
    }});
  } else {
    console.error(`找不到模板目录: ${chalk.green(templatePath)}`);
    return;
  }

  dotFileList.forEach(dest => {
    fs.moveSync(dest, path.join(dest, '..', path.basename(dest).replace('_dot_', '.')))
  });

  // 初始化 git 仓库
  if (tryGitInit(appPath)) {
    console.log();
    console.log('git 仓库初始化完毕');
  }

  // 子问题
  await subQuestions(appPath);

  // 安装依赖
  await execa('yarnpkg', ['install'], { cwd: appPath, stdio: 'inherit' });
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
  await copy(appPath)
}

