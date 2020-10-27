"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BOILERPLATE;
(function (BOILERPLATE) {
    BOILERPLATE["VUE_SPA"] = "@zdxb/cli-tpl-vue-spa";
    BOILERPLATE["VUE_MPA"] = "@zdxb/cli-tpl-vue-mpa";
    BOILERPLATE["EGG"] = "@zdxb/cli-tpl-egg";
    BOILERPLATE["META"] = "@zdxb/cli-tpl-meta";
    BOILERPLATE["SDK"] = "@zdxb/cli-tpl-sdk";
})(BOILERPLATE || (BOILERPLATE = {}));
exports.configList = [
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
