import { QueryResult } from 'pg';
import faker from 'faker';
import { LocationPostgresParser } from '../postgres-parser';

describe('LocationPostgresParser test', () => {
  const parser = new LocationPostgresParser();

  test('getAllCountries is success', async () => {
    const country = {
      id: faker.random.uuid(),
      name: faker.address.country(),
      alpha2Code: faker.address.countryCode(),
      alpha3Code: faker.address.countryCode(),
    };
    const input = ({
      rows: [
        {
          id: country.id,
          name: country.name,
          alpha_two_code: country.alpha2Code,
          alpha_three_code: country.alpha3Code,
          phone_codes: faker.random.word(),
        },
      ],
    } as unknown) as QueryResult;

    const result = parser.getAllCountries(input);
    expect(result).toEqual([country]);
  });
});
