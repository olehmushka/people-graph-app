import { BaseLogger } from 'pino';
import { Client as NativePostgresClient } from 'pg';
import faker from 'faker';
import { PostgresClient } from '../';

const lg = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

const nativePostgresClient = {
  query: jest.fn(),
  end: jest.fn(),
};

describe('postgres-module test', () => {
  beforeEach(() => {
    lg.info.mockClear();
    lg.warn.mockClear();
    lg.error.mockClear();
    nativePostgresClient.query.mockClear();
    nativePostgresClient.end.mockClear();
  });

  test('run is succeed', async () => {
    const data = faker.random.objectElement();
    nativePostgresClient.query.mockImplementation(
      () => new Promise((resolve) => resolve(data)),
    );

    const postgresClient = new PostgresClient(
      (lg as unknown) as BaseLogger,
      (nativePostgresClient as unknown) as NativePostgresClient,
    );

    const result = await postgresClient.query(faker.random.word());

    expect(result).toEqual(data);
  });

  test('run is failed', async () => {
    const error = new Error(faker.random.word());
    nativePostgresClient.query.mockImplementation(
      () => new Promise((_resolve, reject) => reject(error)),
    );

    const postgresClient = new PostgresClient(
      (lg as unknown) as BaseLogger,
      (nativePostgresClient as unknown) as NativePostgresClient,
    );

    try {
      await postgresClient.query(faker.random.word());
    } catch (result) {
      expect(result).toEqual(error);
    }
    expect(lg.error).toBeCalledTimes(1);
  });
});
