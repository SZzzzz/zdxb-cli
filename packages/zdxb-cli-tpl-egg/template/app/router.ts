import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  // 别删 上线的服务必须暴露ping接口 返回 OK
  router.get('/ping', controller.health.ping);
};
