import { EggAppConfig, EggAppInfo, PowerPartial, Context } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1564734395577_8283';

  // add your egg config in here
  config.middleware = [];

  config.cors = {
    origin: (req: Context) => req.header.origin,
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };

  config.security = {
    csrf: {
      ignore: '*',
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
