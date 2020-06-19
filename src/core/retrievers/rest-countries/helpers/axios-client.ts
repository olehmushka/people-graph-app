import { AxiosClient, IAxiosClient } from '../../../modules/axios-client';
import { ILogger } from '../../../lib/logger';
import config from '../../../../../config';

export const getRestCountriesAxiosClient = (logger: ILogger): IAxiosClient =>
  new AxiosClient({
    baseURL: config.services.restCountries.host,
    headers: {
      'Content-Type': 'application/json',
    },
    logger,
  });
