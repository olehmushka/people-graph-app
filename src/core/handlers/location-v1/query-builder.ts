import isNil from 'lodash/isNil';
import { ILocationHandlersV1GetAllCountriesParams } from '../../interfaces';

export interface ILocationQueryBuilder {
  getAllCountries(params: ILocationHandlersV1GetAllCountriesParams): string;
  getOneCountry(id: string): string;
  getOneCity(id: string): string;
}

export class LocationPostgresQueryBuilder implements ILocationQueryBuilder {
  public getAllCountries(params: ILocationHandlersV1GetAllCountriesParams): string {
    if (!isNil(params.countryName)) {
      return `
      SELECT * FROM countries
      WHERE name ~* '${params.countryName}'
      LIMIT ${params.limit} OFFSET ${params.skip};`;
    }

    return `SELECT * FROM countries LIMIT ${params.limit} OFFSET ${params.skip};`;
  }

  public getOneCountry(id: string): string {
    return `
    SET location_domain.country_id = '${id}';
    SELECT * FROM full_country_with_states_by_id;
    `;
  }

  public getOneCity(id: string): string {
    return `
    SET location_domain.city_id = '${id}';
    SELECT * FROM full_city_by_id;
    `;
  }
}
