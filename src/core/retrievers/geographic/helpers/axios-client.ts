import { AxiosClient, IAxiosClient } from '../../../modules/axios-client';
import { ILogger } from '../../../lib/logger';
import config from '../../../../../config';

export const getGeographicAxiosClient = (logger: ILogger): IAxiosClient =>
  new AxiosClient({
    baseURL: config.services.geographic.host,
    headers: {},
    logger,
  });
