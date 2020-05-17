import { HttpServer } from './servers/http';
import { createSession } from './core/modules/neo4j';
import config from '../config';

export class App {
  public static async start() {
    const session = createSession({
      uri: config.neo4j.uri,
      user: config.neo4j.user,
      password: config.neo4j.password,
    });

    const dependencies = {
      neo4jSession: session,
    };

    return Promise.all([HttpServer.start(dependencies)]);
  }
}
