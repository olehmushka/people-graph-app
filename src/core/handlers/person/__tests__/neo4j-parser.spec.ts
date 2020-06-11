import { QueryResult } from 'neo4j-driver';
import moment from 'moment';
import omit from 'lodash/omit';
import faker from 'faker';
import { PersonNeo4jParser } from '../neo4j-parser';

describe('LocationPostgresParser test', () => {
  const parser = new PersonNeo4jParser();

  test('getAllCountries is success', async () => {
    const person = {
      id: faker.random.uuid(),
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      birthday: moment(faker.date.past()),
    };
    const input = ({
      records: [
        {
          get: jest.fn(() => ({
            properties: {
              ...person,
              birthday: {
                year: { low: person.birthday.year() },
                month: { low: person.birthday.month() },
                day: { low: person.birthday.date() },
                hour: { low: person.birthday.hour() },
                minute: { low: person.birthday.minute() },
                second: { low: person.birthday.second() },
              },
            },
          })),
        },
      ],
    } as unknown) as QueryResult;

    const result = parser.getAll(input);
    expect(result.map((el) => omit(el, ['birthday']))).toEqual([omit(person, ['birthday'])]);
    expect(result.some((el) => el.birthday.isSame(person.birthday, 'day'))).toEqual(true);
  });
});
