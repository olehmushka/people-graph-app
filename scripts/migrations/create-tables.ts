import logger from 'pino';
import { creatPostgresConnection, PostgresClient } from '../../src/core/modules/postgres';
import config from '../../config';

const main = async () => {
  const baseLogger = logger();
  const connection = await creatPostgresConnection(baseLogger, {
    ...config.postgres,
  });
  const client = new PostgresClient(baseLogger, connection);
  return client.query(`
  CREATE TABLE IF NOT EXIST persons (
    id varchar(128),
    firstName varchar(255) NOT NULL,
    lastName varchar(255) NOT NULL,
    birthday date

    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXIST person_property_categories (
    id varchar(128),
    name varchar(511) NOT NULL UNIQUE,

    PRIMARY KEY (id)
  );

  CREATE TABLE IF NOT EXIST person_properties (
    id varchar(128),
    person_id varchar(128),
    person_property_category_id varchar(128),
    value jsonb

    PRIMARY KEY (id)
  );
  `);
};

main()
  .catch((error: any) => {
    process.stderr.write(String(error));
    process.exit(1);
  });
