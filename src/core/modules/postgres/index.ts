import { Client as NativePostgresClient, QueryResult, QueryResultRow } from 'pg';
import { ILogger } from '../../lib/logger';

export interface IPostgresConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
}

export const creatPostgresConnection = async (
  logger: ILogger,
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
    const { stack, message } = error instanceof Error ? error : { stack: undefined, message: String(error) };
    logger.error({ stack, message }, 'Postgres connection error');
    process.exit(1);
  }
};

export interface IPostgresClient {
  query<T extends QueryResultRow>(query: string, values?: any[]): Promise<QueryResult<T> | QueryResult<T>[]>;
  end(): Promise<void>;
}

export class PostgresClient implements IPostgresClient {
  private static instance: PostgresClient;
  constructor(private readonly logger: ILogger, private readonly client: NativePostgresClient) {
    PostgresClient.instance = this;
  }

  public query<T extends QueryResultRow>(query: string, values?: any[]): Promise<QueryResult<T> | QueryResult<T>[]> {
    const self = this === undefined ? PostgresClient.instance : this;

    return self.client
      .query<T>(query, values)
      .then((result) => self.buildResponse<T>(result))
      .catch(self.errorHandler);
  }

  public end(): Promise<void> {
    const self = this === undefined ? PostgresClient.instance : this;

    return self.client.end();
  }

  private buildResponse<T extends QueryResultRow>(
    data: QueryResult<T> | QueryResult<T>[],
  ): QueryResult<T> | QueryResult<T>[] {
    if (Array.isArray(data)) {
      return data.filter((result) => result.command === 'SELECT');
    }

    return data;
  }

  private errorHandler(error: unknown): never {
    const self = this === undefined ? PostgresClient.instance : this;
    self.logger.error(error, 'Postrges query error');
    throw error;
  }
}
