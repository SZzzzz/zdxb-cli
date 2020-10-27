import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  validate: {
    enable: true,
    package: 'egg-validate',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  logrotator: {
    enable: true,
    package: 'egg-logrotator',
    env: [ 'local' ],
  },
};

export default plugin;
