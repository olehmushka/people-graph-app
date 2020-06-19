import { map } from 'rxjs/operators';
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
    return this.axiosClient
      .get<IAxiosClientResponse<IRestCountriesV2Country[]>>(config.services.restCountries.paths.countriesV2)
      .pipe<ICountry[]>(
        map<IAxiosClientResponse<IRestCountriesV2Country[]>, ICountry[]>(
          (res: IAxiosClientResponse<IRestCountriesV2Country[]>): ICountry[] => this.mapper.getCountries(res.data),
        ),
      )
      .toPromise();
  }
}

export interface IRestCountriesRetrieverConfig {
  axiosClient: IAxiosClient;
}

export const getRestCountriesRetreiver = ({ axiosClient }: IRestCountriesRetrieverConfig): IRestCountriesRetriever =>
  new RestCountriesRetriever(axiosClient, new RestCountriesMapper());
