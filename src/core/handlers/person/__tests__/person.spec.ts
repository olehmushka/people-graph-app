import { BaseLogger } from 'pino';
import faker from 'faker';
import omit from 'lodash/omit';
import { PersonHandlers } from '..';

const lg = ({
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
} as unknown) as BaseLogger;

const defaultNeo4jClient = {
  run: jest.fn(),
};

const defaultPostgresClient = {
  query: jest.fn(),
  end: jest.fn(),
};

const qb = {
  createOne: jest.fn(),
  getAll: jest.fn(),
  deleteOne: jest.fn(),
};

describe('PersonHandlers test', () => {
  beforeEach(() => {
    defaultNeo4jClient.run.mockClear();
    defaultPostgresClient.query.mockClear();
    defaultPostgresClient.end.mockClear();
  });

  test('createOne is success', async () => {
    const ph = new PersonHandlers(
      lg,
      defaultNeo4jClient,
      defaultPostgresClient,
      qb,
      qb,
    );
    const basePerson = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthday: faker.date.past(),
    };
    const result = await ph.createOne(basePerson);
    expect(omit(result, ['id'])).toEqual(basePerson);
  });

  test('getAll is success', async () => {
    const basePerson = {
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthday: faker.date.past(),
    };
    defaultNeo4jClient.run.mockImplementation(
      () =>
        new Promise((resolve) =>
          resolve([{ get: jest.fn(() => ({ properties: basePerson })) }]),
        ),
    );
    const ph = new PersonHandlers(
      lg,
      defaultNeo4jClient,
      defaultPostgresClient,
      qb,
      qb,
    );
    const result = await ph.getAll({ skip: 0, limit: 0 });
    expect(omit(result[0], ['id', 'birthday'])).toEqual(
      omit(basePerson, ['birthday']),
    );
  });

  test('deleteOne is success', async () => {
    const ph = new PersonHandlers(
      lg,
      defaultNeo4jClient,
      defaultPostgresClient,
      qb,
      qb,
    );
    await ph.deleteOne(faker.random.uuid());
    expect(defaultNeo4jClient.run).toHaveBeenCalledTimes(1);
  });
});