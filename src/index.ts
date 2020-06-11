import logger from 'pino';
import { Server } from 'http';
import { HttpServer } from './servers/http';
import { GrpcServer } from './servers/grpc';
import { createSession } from './core/modules/neo4j';
import { creatPostgresConnection } from './core/modules/postgres';
import config from '../config';

export class App {
  public static async start(): Promise<[Server, void]> {
    const session = createSession({
      uri: config.neo4j.uri,
      user: config.neo4j.user,
      password: config.neo4j.password,
    });
    const postgresConnection = await creatPostgresConnection(logger({ level: config.logger.level }), {
      database: config.postgres.database,
      host: config.postgres.host,
      port: config.postgres.port,
      user: config.postgres.user,
      password: config.postgres.password,
    });

    const dependencies = {
      neo4jSession: session,
      postgresConnection,
    };

    return Promise.all([HttpServer.start(dependencies), GrpcServer.start(dependencies)]);
  }
}
