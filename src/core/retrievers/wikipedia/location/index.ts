import { map } from 'rxjs/operators';
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
    return this.axiosClient
      .get<IAxiosClientResponse<string>>(config.services.wikipedia.paths.countries)
      .pipe<ICountry[]>(
        map<IAxiosClientResponse<string>, ICountry[]>((res: IAxiosClientResponse<string>): ICountry[] =>
          this.parser.getCountries(res.data),
        ),
      )
      .toPromise();
  }
}

export interface IWikiLocationRetrieverConfig {
  axiosClient: IAxiosClient;
}

export const getWikiLocationRetreiver = ({ axiosClient }: IWikiLocationRetrieverConfig): IWikiLocationRetriever =>
  new WikiLocationRetriever(axiosClient, new WikiLocationParser());
