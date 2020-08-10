/* eslint-disable @typescript-eslint/no-var-requires */
const semver = require('semver');

function resolveFallback(request: string, options) {
  const Module = require('module');
  const isMain = false;
  const fakeParent = new Module('', null);

  const paths = [];

  for (let i = 0; i < options.paths.length; i++) {
    const path = options.paths[i];
    fakeParent.paths = Module._nodeModulePaths(path);
    const lookupPaths = Module._resolveLookupPaths(request, fakeParent, true);

    if (!paths.includes(path)) paths.push(path);

    for (let j = 0; j < lookupPaths.length; j++) {
      if (!paths.includes(lookupPaths[j])) paths.push(lookupPaths[j]);
    }
  }

  const filename = Module._findPath(request, paths, isMain);
  if (!filename) {
    const err = new Error(`Cannot find module '${request}'`) as Error & { code: string };
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  }
  return filename;
}

const resolve = semver.satisfies(process.version, '>=10.0.0') ? require.resolve : resolveFallback;

export function resolveModule(request: string, context: string) {
  let resolvedPath;
  try {
    resolvedPath = resolve(request, {
      paths: [context],
    });
  } catch (e) {}
  return resolvedPath;
}

export function loadModule(request: string, context: string, force = false) {
  const resolvedPath = exports.resolveModule(request, context);
  if (resolvedPath) {
    if (force) {
      clearRequireCache(resolvedPath);
    }
    return require(resolvedPath);
  }
}

export function clearModule(request: string, context: string) {
  const resolvedPath = exports.resolveModule(request, context);
  if (resolvedPath) {
    clearRequireCache(resolvedPath);
  }
}

function clearRequireCache(id: string, map = new Map()) {
  const module = require.cache[id];
  if (module) {
    map.set(id, true);
    // Clear children modules
    module.children.forEach((child) => {
      if (!map.get(child.id)) clearRequireCache(child.id, map);
    });
    delete require.cache[id];
  }
}
