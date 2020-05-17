import logger, { BaseLogger } from 'pino';
import { configSchema } from './config.schema';

export default ((logger: BaseLogger) => {
  const configs = {
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
    servers: {
      http: {
        port: parseInt(process.env.HTTP_SERVER_PORT as string, 10) || 3000,
        basePath: process.env.HTTP_BASE_PATH || '/',
        swaggerBasePath: process.env.HTTP_SWAGGER_BASE_PATH || '/',
      },
      grpc: {
        port: parseInt(process.env.GRPC_SERVER_PORT as string, 10) || 3001,
      },
    },
    neo4j: {
      uri: process.env.NEO4J_URI,
      user: process.env.NEO4J_USER,
      password: process.env.NEO4J_PASSWORD,
    },
  };
  const { error, value } = configSchema.validate(configs);
  if (error) {
    logger.error('Validation error', error);
  }
  return value;
})(logger());
