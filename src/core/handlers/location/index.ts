import { BaseLogger } from 'pino';
import { IPostgresClient } from '../../modules/postgres';
import {
  LocationPostgresQueryBuilder,
  ILocationQueryBuilder,
} from './query-builder';
import {
  LocationPostgresParser,
  ILocationPostgresParser,
  ILocationRowCountry,
} from './postgres-parser';
import {
  ILocationHandlersGetAllCountriesParams,
  ICountry,
} from '../../interfaces';

export interface ILocationHandlers {
  getAllCountries(
    params: ILocationHandlersGetAllCountriesParams,
  ): Promise<ICountry[]>;
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

  public async getAllCountries(
    params: ILocationHandlersGetAllCountriesParams,
  ): Promise<ICountry[]> {
    const self = this === undefined ? LocationHandlers.instance : this;

    try {
      const result = await self.postgresClient
        .query<ILocationRowCountry>(
          self.postgresQueryBuilder.getAllCountries(params),
        )
        .then(self.postgresParser.getAllCountries);

      return result;
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  private errorHandle(error: any): Promise<any> {
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

export const getLocationHandler = ({
  logger,
  postgresClient,
}: ILocationHandlerConfig): LocationHandlers =>
  new LocationHandlers(
    logger,
    postgresClient,
    new LocationPostgresQueryBuilder(),
    new LocationPostgresParser(),
  );
