import { IPostgresClient } from '../../modules/postgres';
import { LocationPostgresQueryBuilder, ILocationQueryBuilder } from './query-builder';
import {
  LocationPostgresParser,
  ILocationPostgresParser,
  ILocationRowCountry,
  ILocationRawFullCountry,
  ILocationRowFullCity,
} from './postgres-parser';
import { ILocationHandlersV1GetAllCountriesParams, ICountry, ICountryWithStates, ICity } from '../../interfaces';
import { NotFoundError } from '../../../servers/http/api/errors';
import { ILogger } from '../../lib/logger';

export interface ILocationHandlersV1 {
  getAllCountries(params: ILocationHandlersV1GetAllCountriesParams): Promise<ICountry[]>;
  getOneCountry(id: string): Promise<ICountryWithStates>;
  getOneCity(id: string): Promise<ICity>;
}

export class LocationHandlersV1 implements ILocationHandlersV1 {
  private static instance: LocationHandlersV1;
  constructor(
    private logger: ILogger,
    private postgresClient: IPostgresClient,
    private postgresQueryBuilder: ILocationQueryBuilder,
    private postgresParser: ILocationPostgresParser,
  ) {
    LocationHandlersV1.instance = this;
  }

  public async getAllCountries(params: ILocationHandlersV1GetAllCountriesParams): Promise<ICountry[]> {
    const self = this === undefined ? LocationHandlersV1.instance : this;

    try {
      const queryResult = await self.postgresClient.query<ILocationRowCountry>(
        self.postgresQueryBuilder.getAllCountries(params),
      );
      const mapped = Array.isArray(queryResult)
        ? self.postgresParser.getAllCountries(queryResult[0])
        : self.postgresParser.getAllCountries(queryResult);

      return mapped;
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  public async getOneCountry(id: string): Promise<ICountryWithStates> {
    const self = this === undefined ? LocationHandlersV1.instance : this;

    try {
      const queryResult = await self.postgresClient.query<ILocationRawFullCountry>(
        self.postgresQueryBuilder.getOneCountry(id),
      );

      const mapped = Array.isArray(queryResult)
        ? self.postgresParser.getOneCountry(queryResult[0])
        : self.postgresParser.getOneCountry(queryResult);
      if (mapped.length === 0) {
        throw new NotFoundError(`City with id=${id} was not found`);
      }

      return mapped[0];
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  public async getOneCity(id: string): Promise<ICity> {
    const self = this === undefined ? LocationHandlersV1.instance : this;

    try {
      const queryResult = await self.postgresClient.query<ILocationRowFullCity>(
        self.postgresQueryBuilder.getOneCity(id),
      );
      const mapped = Array.isArray(queryResult)
        ? self.postgresParser.getOneCity(queryResult[0])
        : self.postgresParser.getOneCity(queryResult);
      if (mapped.length === 0) {
        throw new NotFoundError(`City with id=${id} was not found`);
      }

      return mapped[0];
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  private errorHandle<T extends Error>(error: T): Promise<T> {
    const self = this === undefined ? LocationHandlersV1.instance : this;

    const { stack, message } = error;
    self.logger.error({ stack }, message);

    return Promise.reject(error);
  }
}

export interface ILocationHandlerV1Config {
  logger: ILogger;
  postgresClient: IPostgresClient;
}

export const getLocationHandlerV1 = ({ logger, postgresClient }: ILocationHandlerV1Config): LocationHandlersV1 =>
  new LocationHandlersV1(logger, postgresClient, new LocationPostgresQueryBuilder(), new LocationPostgresParser());
