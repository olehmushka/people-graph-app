import logger from 'pino';
import faker from 'faker';
import moment from 'moment';
import omit from 'lodash/omit';
import { PersonHandlers } from '../person';

const lg = logger();

const defaultNeo4jClient = {
  run: jest.fn(),
};

const defaultPostgresClient = {
  query: jest.fn(),
  end: jest.fn(),
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
        new Promise((resolve) => {
          resolve([{ get: jest.fn(() => basePerson) }]);
        }),
    );
    const ph = new PersonHandlers(
      lg,
      defaultNeo4jClient,
      defaultPostgresClient,
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
    );
    await ph.deleteOne(faker.lorem.slug());
    expect(defaultNeo4jClient.run).toHaveBeenCalledTimes(1);
  });
});
