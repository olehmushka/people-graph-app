import 'reflect-metadata';
import logger, { BaseLogger } from 'pino';
import { Server } from 'http';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Session } from 'neo4j-driver';
import { Client } from 'pg';
import './api/controllers';
import config from '../../../config';
import { TYPES } from './ioc/types';
import middlewares, { errors } from './api/middlewares';
import { Neo4jClient } from '../../core/modules/neo4j';
import { PostgresClient } from '../../core/modules/postgres';
import { PersonHandlers, IPersonHandlers } from '../../core/handlers';

export interface IHttpServerDependencies {
  neo4jSession: Session;
  postgresConnection: Client;
}

export class HttpServer {
  static async start(dependencies: IHttpServerDependencies): Promise<Server> {
    const baseLogger = logger({ level: config.logger.level });
    const neo4jClient = new Neo4jClient(baseLogger, dependencies.neo4jSession);
    const postgresClient = new PostgresClient(
      baseLogger,
      dependencies.postgresConnection,
    );
    const container = new Container();

    // bindings
    container.bind<BaseLogger>(TYPES.logger).toConstantValue(baseLogger);

    container
      .bind<IPersonHandlers>(TYPES.personHandlers)
      .toConstantValue(
        new PersonHandlers(baseLogger, neo4jClient, postgresClient),
      );

    const server = new InversifyExpressServer(container, null, {
      rootPath: config.servers.http.basePath,
    });

    return server
      .setConfig(middlewares({ logger: baseLogger }))
      .setErrorConfig(errors({ logger: baseLogger }))
      .build()
      .listen(config.servers.http.port, () => {
        baseLogger.info(
          { port: config.servers.http.port },
          'The HTTP server is running',
        );
      });
  }
}
