import { IAxiosClient, IAxiosClientResponse } from '../../modules/axios-client';
import { RestCountriesMapper, IRestCountriesMapper, IRestCountriesV2Country } from './mapper';
import { ICountry } from '../../interfaces';
import config from '../../../../config';

export interface IRestCountriesRetriever {
  getCountries(): Promise<ICountry[]>;
}

export class RestCountriesRetriever implements IRestCountriesRetriever {
  constructor(private axiosClient: IAxiosClient, private mapper: IRestCountriesMapper) {}

  public getCountries(): Promise<ICountry[]> {
    this.axiosClient.instance.interceptors.response.use((res: IAxiosClientResponse<IRestCountriesV2Country[]>) =>
      this.mapper.getCountries(res.data),
    );

    return this.axiosClient.instance.get<ICountry[], ICountry[]>(config.services.restCountries.paths.countriesV2);
  }
}

export interface IRestCountriesRetrieverConfig {
  axiosClient: IAxiosClient;
}

export const getRestCountriesRetreiver = ({ axiosClient }: IRestCountriesRetrieverConfig): IRestCountriesRetriever =>
  new RestCountriesRetriever(axiosClient, new RestCountriesMapper());
