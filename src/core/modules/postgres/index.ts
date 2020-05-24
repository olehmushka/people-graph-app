import { Client as NativePostgresClient, QueryResult } from 'pg';
import { BaseLogger } from 'pino';

export interface IPostgresConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export const creatPostgresConnection = async (
  logger: BaseLogger,
  config: IPostgresConfig,
): Promise<NativePostgresClient> => {
  try {
    const client = new NativePostgresClient({
      user: config.user,
      host: config.host,
      database: config.database,
      password: config.password,
      port: config.port,
    });
    await client.connect();

    return client;
  } catch (error) {
    const { stack, message } = error;
    logger.error({ stack, message }, 'Postgres connection error');
    process.exit(1);
  }
};

export interface IPostgresClient {
  query(query: string, values?: any[]): Promise<any>;
  end(): Promise<void>;
}

export class PostgresClient implements IPostgresClient {
  private static instance: PostgresClient;
  constructor(
    private readonly logger: BaseLogger,
    private readonly client: NativePostgresClient,
  ) {
    PostgresClient.instance = this;
  }

  public query(query: string, values?: any[]): Promise<any> {
    const self = this === undefined ? PostgresClient.instance : this;

    return self.client
      .query(query, values)
      .then(self.buildResponse)
      .catch(self.errorHandler);
  }

  public end(): Promise<void> {
    const self = this === undefined ? PostgresClient.instance : this;

    return self.client.end();
  }

  private buildResponse(data: QueryResult<any>): any {
    return data;
  }

  private errorHandler(error: any): never {
    const self = this === undefined ? PostgresClient.instance : this;
    self.logger.error(error, 'Postrges query error');
    throw error;
  }
}
