import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg';

export default (appInfo: EggAppInfo) => {
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

  config.logger = {
    dir: '/data/logs/app',
    appLogName: `${appInfo.name}-web.log`,
    coreLogName: `${appInfo.name}-egg-web.log`,
    agentLogName: `${appInfo.name}-egg-agent.log`,
    errorLogName: `${appInfo.name}-common-error.log`,
  };

  return config;
};
