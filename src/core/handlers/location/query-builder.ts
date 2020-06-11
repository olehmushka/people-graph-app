import isNil from 'lodash/isNil';
import { ILocationHandlersGetAllCountriesParams } from '../../interfaces';

export interface ILocationQueryBuilder {
  getAllCountries(params: ILocationHandlersGetAllCountriesParams): string;
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

  public getOneCity(id: string): string {
    return `
    SET location_domain.city_id = '${id}';
    SELECT * FROM full_city_by_id;
    `;
  }
}
