const fs = require("fs-extra");
const path = require("path");
const os = require("os");
const { execSync } = require("child_process");
const chalk = require("chalk");
const execa = require("execa");
const merge = require("lodash.merge");

module.exports = async appPath => {
  const ownPath = path.dirname(
    require.resolve(path.join(__dirname, "..", "package.json"))
  );
  const appPackage = require(path.join(appPath, "package.json"));
  const pkg = require("./pkg");
  merge(appPackage, pkg);

  fs.writeFileSync(
    path.join(appPath, "package.json"),
    JSON.stringify(appPackage, null, 2) + os.EOL
  );

  // 复制模板
  const templatePath = path.join(ownPath, "template");
  if (fs.existsSync(templatePath)) {
    fs.copySync(templatePath, appPath);
  } else {
    console.error(
      `找不到模板目录: ${chalk.green(templatePath)}`
    );
    return;
  }

  // 处理 gitignore 文件
  if (fs.existsSync(path.join(appPath, "gitignore"))) {
    try {
      fs.moveSync(
        path.join(appPath, "gitignore"),
        path.join(appPath, ".gitignore"),
        []
      );
    } catch (err) {
      // Append if there's already a `.gitignore` file there
      if (err.code === "EEXIST") {
        const data = fs.readFileSync(path.join(appPath, "gitignore"));
        fs.appendFileSync(path.join(appPath, ".gitignore"), data);
        fs.unlinkSync(path.join(appPath, "gitignore"));
      } else {
        throw err;
      }
    }
  }

  // 初始化 git 仓库
  if (tryGitInit(appPath)) {
    console.log();
    console.log("git 仓库初始化完毕");
  }

  // 子问题
  await subQuestions(appPath);
  
  // 安装依赖
  await execa("yarnpkg", ["install"], { cwd: appPath, stdio: "inherit" });
};

function isInGitRepository() {
  try {
    execSync("git rev-parse --is-inside-work-tree", { stdio: "ignore" });
    return true;
  } catch (e) {
    return false;
  }
}

function tryGitInit(appPath) {
  try {
    execSync("git --version", { stdio: "ignore", cwd: appPath });
    if (isInGitRepository()) {
      return false;
    }
    execSync("git init", { stdio: "ignore", cwd: appPath });
    return true;
  } catch (e) {
    return false;
  }
}

async function subQuestions(appPath) {
  
}
