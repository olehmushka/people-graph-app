import { BaseLogger } from 'pino';
import faker from 'faker';
import { LocationHandlers } from '..';

const lg = ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} as unknown) as BaseLogger;

const defaultPostgresClient = {
  query: jest.fn(),
  end: jest.fn(),
};

const qb = {
  getAllCountries: jest.fn(),
  getOneCountry: jest.fn(),
  getOneCity: jest.fn(),
};

const parser = {
  getAllCountries: jest.fn(),
  getOneCountry: jest.fn(),
  getOneCity: jest.fn(),
};

describe('LocationHandlers test', () => {
  beforeEach(() => {
    defaultPostgresClient.query.mockClear();
    defaultPostgresClient.end.mockClear();
    qb.getAllCountries.mockClear();
    parser.getAllCountries.mockClear();
  });

  test('getAll is success', async () => {
    const countries = [
      {
        id: faker.random.uuid(),
        name: faker.address.county(),
        alpha2Code: faker.address.countryCode(),
        alpha3Code: faker.address.countryCode(),
      },
    ];
    defaultPostgresClient.query.mockImplementation(() => Promise.resolve());
    parser.getAllCountries.mockImplementation(() => countries);
    const lh = new LocationHandlers(lg, defaultPostgresClient, qb, parser);
    const result = await lh.getAllCountries({ skip: 0, limit: 0 });
    expect(result).toEqual(countries);
  });
});
