import * as j from '@hapi/joi';

const joi = j.extend(require('@hapi/joi-date')); // eslint-disable-line @typescript-eslint/no-var-requires

export const locationGetAllSchema = joi.object().keys({
  skip: joi.number().default(0),
  limit: joi.number().max(100).default(20),
});
