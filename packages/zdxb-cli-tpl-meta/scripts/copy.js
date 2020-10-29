const fs = require('fs-extra');
const path = require('path');
const inquirer = require('inquirer');
const walk = require('./walk');

async function copy(appPath) {
  const questions = [
    {
      type: "confirm",
      message: "是否提取现有项目作为模板",
      name: "fromExist"
    },
    {
      type: "input",
      message: "请输入目标目录路径",
      name: "fromPath",
      when: answer => !!answer.fromExist,
      validate: input => {
        const valid = fs.existsSync(input) && fs.lstatSync(input).isDirectory();
        return valid || `目录：${input} 不存在`;
      }
    },
    {
      type: "checkbox",
      message: "选择需要作为模板的目录或者文件",
      name: "needToCopy",
      choices: answers => {
        return fs.readdirSync(answers.fromPath).map(name => ({ name }));
      },
      when: answers => typeof answers.fromPath === "string"
    }
  ];
  const answers = await inquirer.prompt(questions);
  const fromDir = answers.fromPath;
  const tplPath = path.resolve(appPath, 'template');
  if (Array.isArray(answers.needToCopy) && answers.needToCopy.length > 0) {
    answers.needToCopy.forEach(name => {
      const from = path.resolve(fromDir, name);
      const to = path.resolve(tplPath, name);
      fs.copySync(from, to);
    });
    walk(tplPath, pathname => {
      fs.renameSync(pathname, pathname + '.tpl');
    });
    console.log("文件复制完成");
  }
}

module.exports = copy;