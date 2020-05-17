import * as joi from '@hapi/joi';

export const configSchema = joi.object().keys({
  logger: joi.object({
    level: joi.string().valid('warn', 'debug', 'info', 'error').required(),
  }),
  servers: joi.object({
    http: {
      port: joi.number().integer().min(1024).max(65535).required(),
      basePath: joi.string().required(),
      swaggerBasePath: joi.string().required(),
    },
    grpc: {
      port: joi.number().integer().min(1024).max(65535).required(),
    },
  }),
  neo4j: joi.object({
    uri: joi.string().required(),
    user: joi.string().required(),
    password: joi.string().required(),
  }),
});
