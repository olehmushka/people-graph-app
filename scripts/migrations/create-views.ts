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
    JOIN states AS st ON ci.state_id=st.id
    JOIN countries AS co ON st.country_id=co.id
    WHERE ci.id=cast(current_setting('location_domain.city_id') AS varchar);
  `);
  await client.query(`
  CREATE VIEW full_country_with_states_by_id AS
    SELECT 
      c.id AS country_id,
      c.name AS country_name,
      c.alpha_two_code AS country_alpha_two_code,
      c.alpha_three_code AS country_alpha_three_code,
      (SELECT CONCAT('[',(SELECT STRING_AGG(CONCAT('{"id": "', s1.id, '", "name": "',s1.name,'"}'),', ')
      FROM states s1 
      WHERE s1.country_id = c.id), ']')) country_states
    FROM countries AS c
    LEFT JOIN states AS s ON s.country_id = c.id
    WHERE c.id=cast(current_setting('location_domain.country_id') AS varchar)
    GROUP BY c.id;
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
