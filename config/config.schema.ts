import * as joi from '@hapi/joi';

export const configSchema = joi.object().keys({
  logger: joi.object().keys({
    level: joi.string().valid('warn', 'debug', 'info', 'error').required(),
  }),
  formats: joi.object().keys({
    datetime: joi.string().required(),
  }),
  servers: joi.object().keys({
    http: joi.object().keys({
      port: joi.number().integer().min(1024).max(65535).required(),
      basePath: joi.string().required(),
      swaggerBasePath: joi.string().required(),
    }),
    grpc: joi.object().keys({
      port: joi.number().integer().min(1024).max(65535).required(),
    }),
  }),
  neo4j: joi.object().keys({
    uri: joi.string().required(),
    user: joi.string().required(),
    password: joi.string().required(),
  }),
  postgres: joi.object().keys({
    database: joi.string().required(),
    host: joi.string().required(),
    port: joi.number().integer().min(1024).max(65535).required(),
    user: joi.string().required(),
    password: joi.string().required(),
  }),
  services: joi.object().keys({
    wikipedia: joi.object().keys({
      host: joi.string().uri().required(),
      paths: joi.object().keys({
        countries: joi.string().required(),
      }),
    }),
    geographic: joi.object().keys({
      host: joi.string().uri().required(),
      paths: joi.object().keys({
        countryCodes: joi.string().required(),
      }),
    }),

    restCountries: joi.object().keys({
      host: joi.string().uri().required(),
      paths: joi.object().keys({
        countriesV2: joi.string().required(),
      }),
    }),
  }),
});
