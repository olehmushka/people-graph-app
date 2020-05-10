import 'reflect-metadata';
import { BaseLogger } from 'pino';
import { Server } from 'http';
import { InversifyExpressServer } from 'inversify-express-utils';
import './api/controllers';
import config from '../../config';
import { TYPES } from './ioc/types';
import middlewares, { errors } from './api/middlewares';
import { container } from './ioc/inversify.config';

export class HttpApp {
  static async start(): Promise<Server> {
    const server = new InversifyExpressServer(container, null, { rootPath: config.httpServer.basePath });
    const logger = container.get<BaseLogger>(TYPES.logger);

    return server
      .setConfig(middlewares({ logger }))
      .setErrorConfig(errors({ logger }))
      .build()
      .listen(config.httpServer.port, () => {
        logger.info({ port: config.httpServer.port }, 'The HTTP server is running');
      });
  }
}
