module.exports = {
  "egg": {
    "typescript": true,
    "declarations": true
  },
  "scripts": {
    "start": "egg-scripts start --daemon --title=egg-server-init",
    "stop": "egg-scripts stop --title=egg-server-init",
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "test-local": "egg-bin test",
    "test": "npm run lint -- --fix && npm run test-local",
    "cov": "egg-bin cov",
    "tsc": "ets && tsc -p tsconfig.json",
    "ci": "npm run lint && npm run cov && npm run tsc",
    "autod": "autod",
    "lint": "tslint --project . -c tslint.json",
    "clean": "ets clean"
  },
  "dependencies": {
    "egg": "^2.6.1",
    "egg-cors": "^2.2.2",
    "egg-scripts": "^2.6.0",
    "egg-sequelize": "^5.2.0",
    "egg-validate": "^2.0.2",
    "mysql2": "^2.0.0"
  },
  "devDependencies": {
    "@types/mocha": "^2.2.40",
    "@types/node": "^7.0.12",
    "@types/supertest": "^2.0.0",
    "autod": "^3.0.1",
    "autod-egg": "^1.1.0",
    "egg-ci": "^1.8.0",
    "egg-bin": "^4.11.0",
    "egg-mock": "^3.16.0",
    "tslib": "^1.9.0",
    "tslint": "^5.0.0",
    "tslint-config-egg": "^1.0.0",
    "typescript": "^3.0.0"
  },
  "engines": {
    "node": ">=8.9.0"
  },
  "ci": {
    "version": "8"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "eslintIgnore": ["coverage"],
  "author": "",
  "license": "ISC"
}