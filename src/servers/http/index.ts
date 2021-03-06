import 'reflect-metadata';
import { Server } from 'http';
import { Container } from 'inversify';
import { InversifyExpressServer } from 'inversify-express-utils';
import { Session } from 'neo4j-driver';
import { Client } from 'pg';
import './api/controllers';
import config from '../../../config';
import { TYPES } from './ioc/types';
import middlewares, { errors } from './api/middlewares';
import { PersonMapper, IPersonMapper, LocationMapper, ILocationMapper } from './api/mappers';
import { Neo4jClient } from '../../core/modules/neo4j';
import { PostgresClient } from '../../core/modules/postgres';
import {
  getPersonHandler,
  IPersonHandlers,
  getLocationHandlerV1,
  getLocationHandlerV2,
  ILocationHandlersV1,
  ILocationHandlersV2,
} from '../../core/handlers';
import { getLogger, ILogger } from '../../core/lib/logger';

export interface IHttpServerDependencies {
  neo4jSession: Session;
  postgresConnection: Client;
}

export class HttpServer {
  static async start(dependencies: IHttpServerDependencies): Promise<Server> {
    const baseLogger = getLogger({ level: config.logger.level });
    const neo4jClient = new Neo4jClient(baseLogger, dependencies.neo4jSession);
    const postgresClient = new PostgresClient(baseLogger, dependencies.postgresConnection);
    const container = new Container();

    // bindings
    container.bind<ILogger>(TYPES.logger).toConstantValue(baseLogger);

    container
      .bind<IPersonHandlers>(TYPES.personHandlers)
      .toConstantValue(getPersonHandler({ logger: baseLogger, neo4jClient, postgresClient }));

    container
      .bind<ILocationHandlersV1>(TYPES.locationHandlersV1)
      .toConstantValue(getLocationHandlerV1({ logger: baseLogger, postgresClient }));

    container
      .bind<ILocationHandlersV2>(TYPES.locationHandlersV2)
      .toConstantValue(getLocationHandlerV2({ logger: baseLogger }));

    container.bind<IPersonMapper>(TYPES.personMapper).to(PersonMapper).inSingletonScope();

    container.bind<ILocationMapper>(TYPES.locationMapper).to(LocationMapper).inSingletonScope();

    const server = new InversifyExpressServer(container, null, {
      rootPath: config.servers.http.basePath,
    });

    return server
      .setConfig(middlewares({ logger: baseLogger }))
      .setErrorConfig(errors({ logger: baseLogger }))
      .build()
      .listen(config.servers.http.port, () => {
        baseLogger.info({ port: config.servers.http.port }, 'The HTTP server is running');
      });
  }
}
