import { Controller } from 'egg';

export default class Health extends Controller {
  async ping() {
    this.ctx.status = 200;
    this.ctx.body = 'OK';
  }
}
