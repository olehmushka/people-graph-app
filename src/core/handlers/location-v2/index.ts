import { ILogger } from '../../lib/logger';

export interface ILocationHandlersV2 {
  // getAllCountries(params: ILocationHandlersGetAllCountriesParams): Promise<ICountry[]>;
  // getOneCountry(id: string): Promise<ICountryWithStates>;
  // getOneCity(id: string): Promise<ICity>;
}

export class LocationHandlersV2 implements ILocationHandlersV2 {
  constructor(private logger: ILogger) {}
}

export interface ILocationHandlerV2Config {
  logger: ILogger;
}

export const getLocationHandlerV2 = ({ logger }: ILocationHandlerV2Config): LocationHandlersV2 =>
  new LocationHandlersV2(logger);
