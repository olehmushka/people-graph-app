import { map } from 'rxjs/operators';
import { IAxiosClient, IAxiosClientResponse } from '../../../modules/axios-client';
import { ICountry } from '../../../interfaces';
import { GeographicCountryCodesParser, IGeographicCountryCodesParser } from './parser';
import config from '../../../../../config';

export interface IGeographicCountryCodesRetriever {
  getCountryCodes(): Promise<ICountry[]>;
}

export class GeographicCountryCodesRetriever implements IGeographicCountryCodesRetriever {
  constructor(private axiosClient: IAxiosClient, private parser: IGeographicCountryCodesParser) {}

  public getCountryCodes(): Promise<ICountry[]> {
    return this.axiosClient
      .get<IAxiosClientResponse<string>>(config.services.wikipedia.paths.countries)
      .pipe<ICountry[]>(
        map<IAxiosClientResponse<string>, ICountry[]>((res: IAxiosClientResponse<string>): ICountry[] =>
          this.parser.getCountryCodes(res.data),
        ),
      )
      .toPromise();
  }
}

export interface IGeographicCountryCodesRetrieverConfig {
  axiosClient: IAxiosClient;
}

export const getGeographicCountryCodesRetreiver = ({
  axiosClient,
}: IGeographicCountryCodesRetrieverConfig): IGeographicCountryCodesRetriever =>
  new GeographicCountryCodesRetriever(axiosClient, new GeographicCountryCodesParser());
