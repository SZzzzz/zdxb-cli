import { Question } from 'inquirer';

export type BoilerplateConifg = {
  pkg: string;
  desc: string;
  subQuestions: Question[];
};

enum BOILERPLATE {
  EGG = '@zdxb/cli-tpl-egg',
  META = '@zdxb/cli-tpl-meta',
  SDK = '@zdxb/cli-tpl-sdk',
}

export const configList: BoilerplateConifg[] = [
  {
    pkg: BOILERPLATE.EGG,
    desc: 'egg server 项目',
    subQuestions: [],
  },
  {
    pkg: BOILERPLATE.SDK,
    desc: 'sdk(npm 包) 项目',
    subQuestions: [],
  },
  {
    pkg: BOILERPLATE.META,
    desc: '自举项目模板',
    subQuestions: [],
  },
];
