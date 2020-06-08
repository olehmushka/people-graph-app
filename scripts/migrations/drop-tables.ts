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
  DROP TABLE IF EXISTS persons CASCADE;
  DROP TABLE IF EXISTS person_property_categories CASCADE;
  DROP TABLE IF EXISTS person_properties CASCADE;
  DROP TABLE IF EXISTS countries CASCADE;
  DROP TABLE IF EXISTS states CASCADE;
  DROP TABLE IF EXISTS cities CASCADE;
  `);
};

main()
  .then(() => {
    baseLogger.info('Tables were droped');
    process.exit(0);
  })
  .catch((error: any) => {
    process.stderr.write(String(error));
    process.exit(1);
  });
