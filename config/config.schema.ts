import * as joi from '@hapi/joi';

export const configSchema = joi.object({
  logger: joi.object({
    level: joi.string().valid('warn', 'debug', 'info', 'error').required(),
  }),
  httpServer: joi.object({
    port: joi.number().integer().min(1024).max(65535).required(),
    basePath: joi.string().required(),
    swaggerBasePath: joi.string().required(),
  }),
  grpcServer: joi.object({
    port: joi.number().integer().min(1024).max(65535).required(),
  }),
});
