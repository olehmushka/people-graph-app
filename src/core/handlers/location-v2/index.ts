import { ICountry, ILocationHandlersV2GetAllCountriesParams } from '../../interfaces';
import { getRestCountriesRetreiver, IRestCountriesRetriever } from '../../retrievers/rest-countries';
import { getRestCountriesAxiosClient } from '../../retrievers/rest-countries/helpers';
import { ILogger } from '../../lib/logger';

export interface ILocationHandlersV2 {
  getAllCountries(params: ILocationHandlersV2GetAllCountriesParams): Promise<ICountry[]>;
}

export class LocationHandlersV2 implements ILocationHandlersV2 {
  constructor(private logger: ILogger, private restCountriesRetriever: IRestCountriesRetriever) {}

  public async getAllCountries(params: ILocationHandlersV2GetAllCountriesParams): Promise<ICountry[]> {
    try {
      return await this.restCountriesRetriever.getCountries();
    } catch (error) {
      this.logger.error('location handlers v2 get all countries error', error);

      return [];
    }
  }
}

export interface ILocationHandlerV2Config {
  logger: ILogger;
}

export const getLocationHandlerV2 = ({ logger }: ILocationHandlerV2Config): LocationHandlersV2 =>
  new LocationHandlersV2(logger, getRestCountriesRetreiver({ axiosClient: getRestCountriesAxiosClient(logger) }));
