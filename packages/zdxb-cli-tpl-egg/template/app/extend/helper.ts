import { IHelper } from 'egg';

export default {
  partialValidator(this: IHelper, validator: object) {
    const partialValidator: object = {};
    Object.keys(validator).forEach(k => {
      const v = validator[k];
      if (typeof v === 'string' && !v.endsWith('?')) {
        partialValidator[k] = v + '?';
      } else if (typeof v === 'object' && v !== null) {
        partialValidator[k] = {
          ...v,
          required: false,
        };
      } else {
        partialValidator[k] = v;
      }
    });
    return partialValidator;
  },

  pick<T extends object, K extends keyof T>(data: Partial<T>, keyList: K[]) {
    const set = new Set(keyList) as Set<string>;
    const obj = {} as Partial<Pick<T, K>>;
    Object.keys(data).map(k => {
      if (set.has(k) && typeof data[k] !== 'undefined') {
        obj[k] = data[k];
      }
    });
    return obj;
  },
};
