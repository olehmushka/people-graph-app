import isNil from 'lodash/isNil';
import { ILocationHandlersGetAllCountriesParams } from '../../interfaces';

export interface ILocationQueryBuilder {
  getAllCountries(params: ILocationHandlersGetAllCountriesParams): string;
  getOneCountry(id: string): string;
  getOneCity(id: string): string;
}

export class LocationPostgresQueryBuilder implements ILocationQueryBuilder {
  public getAllCountries(params: ILocationHandlersGetAllCountriesParams): string {
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
    SELECT
      co.id AS country_id,
      co.name AS country_name,
      co.alpha_two_code AS country_alpha_two_code,
      co.alpha_three_code AS country_alpha_three_code
    FROM countries as co
    WHERE co.id='${id}';
    SELECT
      id AS state_id,
      name AS state_name
    FROM states
    WHERE country_id='${id}';
    `;
  }

  public getOneCity(id: string): string {
    return `
    SET location_domain.city_id = '${id}';
    SELECT * FROM full_city_by_id;
    `;
  }
}
