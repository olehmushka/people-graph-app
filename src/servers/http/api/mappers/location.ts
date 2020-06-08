import moment from 'moment';
import { injectable } from 'inversify';
import { API } from '../models/schema';
import { ICountry } from '../../../../core/interfaces';
import config from '../../../../../config';

export interface ILocationMapper {
  responseGetAll(response: ICountry[]): API.GetAllCountriesResponse;
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
}
