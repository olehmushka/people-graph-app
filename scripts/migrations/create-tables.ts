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
  CREATE TABLE IF NOT EXISTS persons (
    id varchar(128) PRIMARY KEY,
    first_name varchar(255) NOT NULL,
    last_name varchar(255) NOT NULL,
    birthday date
  );
  CREATE UNIQUE INDEX persons_id_inx ON persons(id);

  CREATE TABLE IF NOT EXISTS person_property_categories (
    id varchar(128) PRIMARY KEY,
    name varchar(511) NOT NULL UNIQUE
  );
  CREATE UNIQUE INDEX person_property_categories_id_inx ON person_property_categories(id);

  CREATE TABLE IF NOT EXISTS person_properties (
    id varchar(128) PRIMARY KEY,
    person_id varchar(128) REFERENCES persons(id),
    person_property_category_id varchar(128) REFERENCES person_property_categories(id),
    value jsonb
  );
  CREATE UNIQUE INDEX person_properties_id_inx ON person_properties(id, person_id, person_property_category_id);
  `);
};

main()
  .then(() => {
    baseLogger.info('Tables were created');
    process.exit(0);
  })
  .catch((error: any) => {
    process.stderr.write(String(error));
    process.exit(1);
  });
