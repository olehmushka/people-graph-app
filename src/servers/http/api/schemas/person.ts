import * as joi from '@hapi/joi';

export const personCreateSchema = joi.object().keys({
  data: joi.object({
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    birthday: joi.date().iso().required(),
  }),
});

export const personGetAllSchema = joi.object().keys({
  skip: joi.number().default(0),
  limit: joi.number().max(100).default(20),
});

export const personDeleteSchema = joi.object().keys({
  id: joi
    .string()
    .guid({ version: ['uuidv4', 'uuidv5'] })
    .required(),
});
