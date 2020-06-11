import moment from 'moment';
import { injectable } from 'inversify';
import { API } from '../models/schema';
import { ICountry, ICity } from '../../../../core/interfaces';
import config from '../../../../../config';

export interface ILocationMapper {
  responseGetAll(response: ICountry[]): API.GetAllCountriesResponse;
  responseGetOneCity(response: ICity): API.GetOneCityResponse;
}

@injectable()
export class LocationMapper implements ILocationMapper {
  public responseGetAll(response: ICountry[]): API.GetAllCountriesResponse {
    return {
      data: response.map((country) => ({
        id: country.id,
        name: country.name,
        alpha2Code: country.alpha2Code,
        alpha3Code: country.alpha3Code,
      })),
      timestamp: moment().format(config.formats.datetime),
    };
  }

  public responseGetOneCity(response: ICity): API.GetOneCityResponse {
    return {
      data: {
        id: response.id,
        name: response.name,
        state: {
          id: response.state.id,
          name: response.state.name,
        },
        country: {
          id: response.country.id,
          name: response.country.name,
          alpha2Code: response.country.alpha2Code,
          alpha3Code: response.country.alpha3Code,
        },
      },
      timestamp: moment().format(config.formats.datetime),
    };
  }
}
