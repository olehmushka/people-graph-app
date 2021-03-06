import { driver, auth, Session, QueryResult, Neo4jError, Config } from 'neo4j-driver';
import { ILogger } from '../../lib/logger';

export interface INeo4jConfig {
  uri: string;
  user: string;
  password: string;
}

export interface INeo4jClient {
  run(query: string, params?: { [key: string]: any }): Promise<QueryResult>;
}

export const createSession = (baseConfig: INeo4jConfig, authConfig?: Config): Session =>
  driver(baseConfig.uri, auth.basic(baseConfig.user, baseConfig.password), authConfig).session();

export class Neo4jClient implements INeo4jClient {
  private static instance: Neo4jClient;
  constructor(private readonly logger: ILogger, private readonly session: Session) {
    Neo4jClient.instance = this;
  }

  public run(query: string, params?: { [key: string]: any }): Promise<QueryResult> {
    const self = this === undefined ? Neo4jClient.instance : this;

    return self.session.run(query, params).then(self.buildResponse).catch(self.errorHandler);
  }

  private buildResponse(result: QueryResult): QueryResult {
    return result;
  }

  private errorHandler(error: any): never {
    const self = this === undefined ? Neo4jClient.instance : this;
    if (error instanceof Neo4jError) {
      self.logger.error(error, 'Neo4j error');
    }
    throw error;
  }

  public closeSession(): Promise<void> {
    const self = this === undefined ? Neo4jClient.instance : this;

    return self.session.close();
  }
}
