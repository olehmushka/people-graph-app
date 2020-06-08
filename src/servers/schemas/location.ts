import * as j from '@hapi/joi';
import { Schema } from './common';

const joi = j.extend(require('@hapi/joi-date')); // eslint-disable-line @typescript-eslint/no-var-requires

export const locationGetAllSchema = new Schema(
  joi.object().keys({
    skip: joi.number().default(0),
    limit: joi.number().max(100).default(20),
    countryName: joi.string().regex(/^[a-z\d\-_\s]+$/i),
  }),
);
