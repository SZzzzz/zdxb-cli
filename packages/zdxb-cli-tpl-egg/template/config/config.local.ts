import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    dialect: 'mysql',
    timezone: '+08:00',
    host: 'host',
    port: 3306,
    database: 'db',
    username: 'username',
    password: 'password',
  };

  return config;
};
