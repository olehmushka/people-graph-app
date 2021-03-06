import * as j from '@hapi/joi';
import config from '../../../config';
import { Schema } from './common';

const joi = j.extend(require('@hapi/joi-date')); // eslint-disable-line @typescript-eslint/no-var-requires

export const personCreateSchema = new Schema(
  joi.object().keys({
    data: joi.object({
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      birthday: joi.date().format(config.formats.datetime).required(),
    }),
  }),
);

export const personGetAllSchema = new Schema(
  joi.object().keys({
    skip: joi.number().default(0),
    limit: joi.number().max(100).default(20),
  }),
);

export const personDeleteSchema = new Schema(
  joi.object().keys({
    id: joi
      .string()
      .guid({ version: ['uuidv4', 'uuidv5'] })
      .required(),
  }),
);
