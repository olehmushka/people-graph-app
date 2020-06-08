import { BaseLogger } from 'pino';
import { Session, Neo4jError } from 'neo4j-driver';
import faker from 'faker';
import { Neo4jClient } from '../';

const lg = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const defaultSession = {
  run: jest.fn(),
  close: jest.fn(),
};

describe('neo4j-module test', () => {
  beforeEach(() => {
    lg.info.mockClear();
    lg.warn.mockClear();
    lg.error.mockClear();
    defaultSession.run.mockClear();
    defaultSession.close.mockClear();
  });

  test('run is succeed', async () => {
    const records = faker.random.objectElement();
    defaultSession.run.mockImplementation(() => Promise.resolve(records));
    const neo4jClient = new Neo4jClient(
      (lg as unknown) as BaseLogger,
      (defaultSession as unknown) as Session,
    );

    const result = await neo4jClient.run(faker.random.word());
    expect(result).toEqual(records);
  });

  test('run is fail', async () => {
    const error = new Neo4jError(faker.random.word());
    defaultSession.run.mockImplementation(() => Promise.reject(error));
    const neo4jClient = new Neo4jClient(
      (lg as unknown) as BaseLogger,
      (defaultSession as unknown) as Session,
    );

    try {
      await neo4jClient.run(faker.random.word());
    } catch (result) {
      expect(result).toEqual(error);
    }
    expect(lg.error).toBeCalledTimes(1);
  });

  test('closeSession is succeed', async () => {
    const neo4jClient = new Neo4jClient(
      (lg as unknown) as BaseLogger,
      (defaultSession as unknown) as Session,
    );

    await neo4jClient.closeSession();
    expect(defaultSession.close).toBeCalledTimes(1);
  });
});
