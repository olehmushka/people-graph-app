import logger, { BaseLogger } from 'pino';
import { configSchema } from './config.schema';

export default ((logger: BaseLogger) => {
  const configs = {
    logger: {
      level: process.env.LOG_LEVEL || 'info',
    },
    httpServer: {
      port: parseInt(process.env.HTTP_SERVER_PORT as string, 10) || 3000,
      basePath: process.env.HTTP_BASE_PATH || '/',
      swaggerBasePath: process.env.HTTP_SWAGGER_BASE_PATH || '/',
    },
    grpcServer: {
      port: parseInt(process.env.GRPC_SERVER_PORT as string, 10) || 3001,
    },
  };
  const { error, value } = configSchema.validate(configs);
  if (error) {
    logger.error('Validation error', error);
  }
  return value;
})(logger());
