import { IAxiosClient, IAxiosClientResponse } from '../../../modules/axios-client';
import { ICountry } from '../../../interfaces';
import { WikiLocationParser, IWikiLocationParser } from './parser';
import config from '../../../../../config';

export interface IWikiLocationRetriever {
  getCountries(): Promise<ICountry[]>;
}

export class WikiLocationRetriever implements IWikiLocationRetriever {
  constructor(private axiosClient: IAxiosClient, private parser: IWikiLocationParser) {}

  public getCountries(): Promise<ICountry[]> {
    this.axiosClient.instance.interceptors.response.use((res: IAxiosClientResponse<string>) =>
      this.parser.getCountries(res.data),
    );

    return this.axiosClient.instance.get<ICountry[], ICountry[]>(config.services.wikipedia.paths.countries);
  }
}

export interface IWikiLocationRetrieverConfig {
  axiosClient: IAxiosClient;
}

export const getWikiLocationRetreiver = ({ axiosClient }: IWikiLocationRetrieverConfig): IWikiLocationRetriever =>
  new WikiLocationRetriever(axiosClient, new WikiLocationParser());
