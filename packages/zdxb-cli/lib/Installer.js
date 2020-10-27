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
var os_1 = __importDefault(require("os"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var execa_1 = __importDefault(require("execa"));
var module_1 = require("./util/module");
var Installer = /** @class */ (function () {
    function Installer(targetDir, answers) {
        this.targetDir = targetDir;
        this.projectTemplate = answers.projectTemplate;
    }
    Installer.prototype.installTpl = function () {
        return __awaiter(this, void 0, void 0, function () {
            var isLocal, name, pkg, tplPackage;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        isLocal = !!process.env.isLocal;
                        name = path_1.default.basename(this.targetDir);
                        pkg = {
                            name: name,
                            version: '0.0.1',
                        };
                        fs_extra_1.default.writeFileSync(path_1.default.join(this.targetDir, 'package.json'), JSON.stringify(pkg, null, 2) + os_1.default.EOL);
                        tplPackage = isLocal
                            ? "file:" + path_1.default.resolve(__dirname, '../../', 'zdxb-' + this.projectTemplate.split('/')[1])
                            : this.projectTemplate;
                        return [4 /*yield*/, this.yarnAdd([tplPackage], true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Installer.prototype.initProject = function () {
        return __awaiter(this, void 0, void 0, function () {
            var init;
            return __generator(this, function (_a) {
                init = module_1.loadModule(this.projectTemplate + "/scripts/init", this.targetDir);
                init(this.targetDir);
                return [2 /*return*/];
            });
        });
    };
    Installer.prototype.yarnAdd = function (depList, isDev) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var command = 'yarnpkg';
            var args = ['add', '--exact'].concat(depList);
            if (isDev) {
                args.push('--dev');
            }
            var child = execa_1.default(command, args, {
                stdio: 'inherit',
                cwd: _this.targetDir,
            });
            child.on('close', function (code) {
                if (code !== 0) {
                    reject({
                        command: command + " " + args.join(' '),
                    });
                }
                else {
                    resolve();
                }
            });
        });
    };
    Installer.prototype.run = function (command, args) {
        var _a;
        if (!args) {
            _a = command.split(/\s+/), command = _a[0], args = _a.slice(1);
        }
        return execa_1.default(command, args, { cwd: this.targetDir });
    };
    return Installer;
}());
exports.default = Installer;
