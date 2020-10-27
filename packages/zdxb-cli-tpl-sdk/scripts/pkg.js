module.exports = {
  "bizlineIds": [
    8
  ],
  "scripts": {
    "build": "tsc && rollup -c rollup.config.js"
  },
  "main": "lib/index.js",
  "devDependencies": {
    "@types/node": "^12.6.2",
    "rollup": "^1.20.3",
    "rollup-plugin-commonjs": "^10.1.0",
    "rollup-plugin-json": "^4.0.0",
    "rollup-plugin-node-resolve": "^5.2.0",
    "rollup-plugin-uglify": "^6.0.3",
    "typescript": "^3.5.2"
  },
}