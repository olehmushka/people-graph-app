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
    this.axiosClient.instance.interceptors.response.use((res: IAxiosClientResponse<string>) =>
      this.parser.getCountryCodes(res.data),
    );

    return this.axiosClient.instance.get<ICountry[], ICountry[]>(config.services.wikipedia.paths.countries);
  }
}

export interface IGeographicCountryCodesRetrieverConfig {
  axiosClient: IAxiosClient;
}

export const getGeographicCountryCodesRetreiver = ({
  axiosClient,
}: IGeographicCountryCodesRetrieverConfig): IGeographicCountryCodesRetriever =>
  new GeographicCountryCodesRetriever(axiosClient, new GeographicCountryCodesParser());
