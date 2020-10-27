"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var inquirer_1 = __importDefault(require("inquirer"));
var chalk_1 = __importDefault(require("chalk"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var validate_npm_package_name_1 = __importDefault(require("validate-npm-package-name"));
var util_1 = require("./util");
var Installer_1 = __importDefault(require("./Installer"));
function create(projectName, options) {
    return __awaiter(this, void 0, void 0, function () {
        var cwd, inCurrent, name, targetDir, result, ok, answers, installer;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    cwd = process.cwd();
                    inCurrent = projectName === '.';
                    name = inCurrent ? path_1.default.relative('../', cwd) : projectName;
                    targetDir = path_1.default.resolve(cwd, projectName || '.');
                    result = validate_npm_package_name_1.default(name);
                    if (!result.validForNewPackages) {
                        console.error(chalk_1.default.red("Invalid project name: \"" + name + "\""));
                        result.errors &&
                            result.errors.forEach(function (err) {
                                console.error(chalk_1.default.red.dim('Error: ' + err));
                            });
                        result.warnings &&
                            result.warnings.forEach(function (warn) {
                                console.error(chalk_1.default.red.dim('Warning: ' + warn));
                            });
                        process.exit(1);
                    }
                    if (!fs_extra_1.default.existsSync(targetDir)) return [3 /*break*/, 2];
                    return [4 /*yield*/, inquirer_1.default.prompt([
                            {
                                name: 'ok',
                                type: 'confirm',
                                message: "\u76EE\u5F55\u5DF2\u5B58\u5728\uFF0C\u8981\u5728\u8FD9\u4E2A\u76EE\u5F55\u521B\u5EFA\u9879\u76EE\u5417\uFF1F" + chalk_1.default.redBright('这将会清空该目录') + "!",
                            },
                        ])];
                case 1:
                    ok = (_a.sent()).ok;
                    if (!ok) {
                        return [2 /*return*/];
                    }
                    else {
                        fs_extra_1.default.removeSync(targetDir);
                    }
                    _a.label = 2;
                case 2: return [4 /*yield*/, inquirer_1.default.prompt(util_1.getPrompts())];
                case 3:
                    answers = _a.sent();
                    fs_extra_1.default.mkdirpSync(projectName);
                    installer = new Installer_1.default(targetDir, answers);
                    return [4 /*yield*/, installer.installTpl()];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, installer.initProject()];
                case 5:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
function default_1(projectName, options) {
    return __awaiter(this, void 0, void 0, function () {
        var error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, create(projectName, options)];
                case 1:
                    _a.sent();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error(error_1);
                    process.exit(1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.default = default_1;
