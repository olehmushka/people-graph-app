import logger from 'pino';
import { creatPostgresConnection, PostgresClient } from '../../src/core/modules/postgres';
import config from '../../config';

const baseLogger = logger();

const main = async (): Promise<void> => {
  const connection = await creatPostgresConnection(baseLogger, {
    ...config.postgres,
  });
  const client = new PostgresClient(baseLogger, connection);

  client.query(`
  DROP VIEW IF EXISTS full_city_by_id CASCADE;
  `);
};

main()
  .then(() => {
    baseLogger.info('Views were droped');
    process.exit(0);
  })
  .catch((error: any) => {
    process.stderr.write(String(error));
    process.exit(1);
  });
