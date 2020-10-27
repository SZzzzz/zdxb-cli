import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/health.test.ts', () => {
  it('should GET /ping', async () => {
    const result = await app.httpRequest().get('/ping').expect(200);
    assert(result.text === 'OK');
  });
});
