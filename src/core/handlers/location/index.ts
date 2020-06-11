import { BaseLogger } from 'pino';
import { QueryResult } from 'pg';
import { IPostgresClient } from '../../modules/postgres';
import { LocationPostgresQueryBuilder, ILocationQueryBuilder } from './query-builder';
import {
  LocationPostgresParser,
  ILocationPostgresParser,
  ILocationRowCountry,
  ILocationRawFullCountryCountryPart,
  ILocationRawFullCountryStatePart,
  ILocationRowFullCity,
} from './postgres-parser';
import { ILocationHandlersGetAllCountriesParams, ICountry, ICountryWithStates, ICity } from '../../interfaces';
import { NotFoundError } from '../../../servers/http/api/errors';

export interface ILocationHandlers {
  getAllCountries(params: ILocationHandlersGetAllCountriesParams): Promise<ICountry[]>;
  getOneCountry(id: string): Promise<ICountryWithStates>;
  getOneCity(id: string): Promise<ICity>;
}

export class LocationHandlers implements ILocationHandlers {
  private static instance: LocationHandlers;
  constructor(
    private logger: BaseLogger,
    private postgresClient: IPostgresClient,
    private postgresQueryBuilder: ILocationQueryBuilder,
    private postgresParser: ILocationPostgresParser,
  ) {
    LocationHandlers.instance = this;
  }

  public async getAllCountries(params: ILocationHandlersGetAllCountriesParams): Promise<ICountry[]> {
    const self = this === undefined ? LocationHandlers.instance : this;

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
    const self = this === undefined ? LocationHandlers.instance : this;

    try {
      const queryResult = (await self.postgresClient.query<
        ILocationRawFullCountryCountryPart | ILocationRawFullCountryStatePart
      >(self.postgresQueryBuilder.getOneCountry(id))) as [
        QueryResult<ILocationRawFullCountryCountryPart>,
        QueryResult<ILocationRawFullCountryStatePart>,
      ];

      if (!Array.isArray(queryResult)) {
        throw new NotFoundError(`country with id=${id} or its states were found`);
      }

      if (queryResult.length !== 2) {
        throw new NotFoundError(`country with id=${id} or its states were found`);
      }

      if (queryResult[0].rows.length === 0) {
        throw new NotFoundError(`country with id=${id} was not found`);
      }

      const mapped = self.postgresParser.getOneCountry(queryResult);

      return mapped;
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  public async getOneCity(id: string): Promise<ICity> {
    const self = this === undefined ? LocationHandlers.instance : this;

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
    const self = this === undefined ? LocationHandlers.instance : this;

    const { stack, message } = error;
    self.logger.error({ stack }, message);

    return Promise.reject(error);
  }
}

export interface ILocationHandlerConfig {
  logger: BaseLogger;
  postgresClient: IPostgresClient;
}

export const getLocationHandler = ({ logger, postgresClient }: ILocationHandlerConfig): LocationHandlers =>
  new LocationHandlers(logger, postgresClient, new LocationPostgresQueryBuilder(), new LocationPostgresParser());
