import logger from 'pino';
import { creatPostgresConnection, PostgresClient } from '../../src/core/modules/postgres';
import config from '../../config';

const baseLogger = logger();

const main = async (): Promise<void> => {
  const connection = await creatPostgresConnection(baseLogger, {
    ...config.postgres,
  });
  const client = new PostgresClient(baseLogger, connection);

  await client.query(`
  CREATE VIEW full_city_by_id AS
    SELECT
      ci.id AS city_id,
      ci.name AS city_name,
      st.id AS state_id,
      st.name AS state_name,
      co.id AS country_id,
      co.name AS country_name,
      co.alpha_two_code AS country_alpha_two_code,
      co.alpha_three_code AS country_alpha_three_code
    FROM cities AS ci
    JOIN states as st ON ci.state_id=st.id
    JOIN countries as co ON st.country_id=co.id
    WHERE ci.id=cast(current_setting('location_domain.city_id') as varchar);
  `);
};

main()
  .then(() => {
    baseLogger.info('Views were created');
    process.exit(0);
  })
  .catch((error: unknown) => {
    process.stderr.write(String(error));
    process.exit(1);
  });
