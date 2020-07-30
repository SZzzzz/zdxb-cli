import { Question } from 'inquirer';

export type BoilerplateConifg = {
  pkg: string;
  desc: string;
  subQuestions: Question[];
};

enum BOILERPLATE {
  VUE_SPA = '@zdxb/cli-tpl-vue-spa',
  VUE_MPA = '@zdxb/cli-tpl-vue-mpa',
  EGG = '@zdxb/cli-tpl-egg',
  META = '@zdxb/cli-tpl-meta',
  SDK = '@zdxb/cli-tpl-sdk',
}

export const configList: BoilerplateConifg[] = [
  {
    pkg: BOILERPLATE.VUE_SPA,
    desc: 'Vue 单页应用',
    subQuestions: [],
  },
  {
    pkg: BOILERPLATE.VUE_MPA,
    desc: 'Vue 多页应用',
    subQuestions: [],
  },
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
