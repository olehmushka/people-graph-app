import { Server, ServerCredentials } from 'grpc';
import { Session } from 'neo4j-driver';
import logger from 'pino';
import person from './handlers/person';
import config from '../../../config';
import { PersonHandlers } from '../../core/handlers';
import { Neo4jClient } from '../../core/modules/neo4j';

export interface IGrpcServerDependencies {
  neo4jSession: Session;
}

export class GrpcServer {
  static async start(dependencies: IGrpcServerDependencies): Promise<any> {
    const server = new Server();
    const baseLogger = logger({ level: config.logger.level });
    const neo4jClient = new Neo4jClient(baseLogger, dependencies.neo4jSession);

    server.addService(
      person.service,
      new person.handler(
        baseLogger,
        new PersonHandlers(baseLogger, neo4jClient),
      ),
    );

    server.bindAsync(
      `0.0.0.0:${config.servers.grpc.port}`,
      ServerCredentials.createInsecure(),
      (error: Error | null, port: number) => {
        if (error) {
          const { message, stack } = error;
          baseLogger.error({ stack }, message);
          return;
        }
        baseLogger.info({ port }, 'The gRPC server is running');
      },
    );
    return server.start();
  }
}
