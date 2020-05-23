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
  constructor(
    private readonly logger: BaseLogger,
    private readonly client: NativePostgresClient,
  ) {}

  public query(query: string, values?: any[]): Promise<any> {
    return this.client
      .query(query, values)
      .then(this.buildResponse)
      .catch(this.errorHandler);
  }

  public end(): Promise<void> {
    return this.client.end();
  }

  private buildResponse(data: QueryResult<any>): any {
    return data;
  }

  private errorHandler(error: any): never {
    this.logger.error(error, 'Postrges query error');
    throw error;
  }
}
