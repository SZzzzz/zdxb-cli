"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
var semver = require('semver');
function resolveFallback(request, options) {
    var Module = require('module');
    var isMain = false;
    var fakeParent = new Module('', null);
    var paths = [];
    for (var i = 0; i < options.paths.length; i++) {
        var path = options.paths[i];
        fakeParent.paths = Module._nodeModulePaths(path);
        var lookupPaths = Module._resolveLookupPaths(request, fakeParent, true);
        if (!paths.includes(path))
            paths.push(path);
        for (var j = 0; j < lookupPaths.length; j++) {
            if (!paths.includes(lookupPaths[j]))
                paths.push(lookupPaths[j]);
        }
    }
    var filename = Module._findPath(request, paths, isMain);
    if (!filename) {
        var err = new Error("Cannot find module '" + request + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
    }
    return filename;
}
var resolve = semver.satisfies(process.version, '>=10.0.0') ? require.resolve : resolveFallback;
function resolveModule(request, context) {
    var resolvedPath;
    try {
        resolvedPath = resolve(request, {
            paths: [context],
        });
    }
    catch (e) { }
    return resolvedPath;
}
exports.resolveModule = resolveModule;
function loadModule(request, context, force) {
    if (force === void 0) { force = false; }
    var resolvedPath = exports.resolveModule(request, context);
    if (resolvedPath) {
        if (force) {
            clearRequireCache(resolvedPath);
        }
        return require(resolvedPath);
    }
}
exports.loadModule = loadModule;
function clearModule(request, context) {
    var resolvedPath = exports.resolveModule(request, context);
    if (resolvedPath) {
        clearRequireCache(resolvedPath);
    }
}
exports.clearModule = clearModule;
function clearRequireCache(id, map) {
    if (map === void 0) { map = new Map(); }
    var module = require.cache[id];
    if (module) {
        map.set(id, true);
        // Clear children modules
        module.children.forEach(function (child) {
            if (!map.get(child.id))
                clearRequireCache(child.id, map);
        });
        delete require.cache[id];
    }
}
