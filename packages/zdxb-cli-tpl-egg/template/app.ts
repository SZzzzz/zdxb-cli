import { Application, IBoot } from 'egg';

export default class Boot implements IBoot {

  constructor(private readonly app: Application) {}

  async didReady() {
    await this.app.model.sync();
  }
}
