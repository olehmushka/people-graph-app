import { AxiosClient, IAxiosClient } from '../../../modules/axios-client';
import { ILogger } from '../../../lib/logger';
import config from '../../../../../config';

export const getWikiAxiosClient = (logger: ILogger): IAxiosClient =>
  new AxiosClient({
    baseURL: config.services.wikipedia.host,
    headers: {
      'Content-Type': 'text/html',
    },
    logger,
  });
