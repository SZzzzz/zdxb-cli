import { Context } from 'egg';

export default {
  getUserInfo(this: Context) {
    const workId = Number(this.request.header['x-work-id']);
    const workName = decodeURIComponent(String(this.request.header['x-work-name']));
    if (!workId || !workName) {
      this.throw(403, 'request header 必须有 x-work-id 和 x-work-name 字段');
    }
    return {
      workId,
      workName,
    };
  },

  getPaginationData(this: Context) {
    const DEFAULT_PAGE_SIZE = 20;
    const pageNum = Number(this.query.pageNum) || 1;
    const pageSize = Number(this.query.pageSize) || DEFAULT_PAGE_SIZE;
    const offset = pageSize * (pageNum - 1);
    return {
      pageNum,
      pageSize,
      offset,
    };
  },

  validate(this: Context, rules: object, data: object) {
    data = data || this.request.body;
    const errors = this.app.validator.validate(rules, data);
    if (errors) {
      this.throw(400, 'Validation Failed', {
        code: 'invalid_param',
        errors,
      });
    }
  },

  success(this: Context, data: any, message: string = 'success') {
    this.response.status = 200;
    this.body = {
      message,
      data,
    };
  },
};
