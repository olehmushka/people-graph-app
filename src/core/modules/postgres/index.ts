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
  query<T>(query: string, values?: any[]): Promise<QueryResult<T> | QueryResult<T>[]>;
  end(): Promise<void>;
}

export class PostgresClient implements IPostgresClient {
  private static instance: PostgresClient;
  constructor(private readonly logger: BaseLogger, private readonly client: NativePostgresClient) {
    PostgresClient.instance = this;
  }

  public query<T>(query: string, values?: any[]): Promise<QueryResult<T> | QueryResult<T>[]> {
    const self = this === undefined ? PostgresClient.instance : this;

    return self.client
      .query(query, values)
      .then((result) => self.buildResponse<T>(result))
      .catch(self.errorHandler);
  }

  public end(): Promise<void> {
    const self = this === undefined ? PostgresClient.instance : this;

    return self.client.end();
  }

  private buildResponse<T>(data: QueryResult<T> | QueryResult<T>[]): QueryResult<T> | QueryResult<T>[] {
    if (Array.isArray(data)) {
      return data.filter((result) => result.command === 'SELECT');
    }

    return data;
  }

  private errorHandler<T extends Error>(error: T): never {
    const self = this === undefined ? PostgresClient.instance : this;
    self.logger.error(error, 'Postrges query error');
    throw error;
  }
}
