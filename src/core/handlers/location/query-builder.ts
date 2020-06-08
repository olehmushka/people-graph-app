import isNil from 'lodash/isNil';
import { ILocationHandlersGetAllCountriesParams } from '../../interfaces';

export interface ILocationQueryBuilder {
  getAllCountries(params: ILocationHandlersGetAllCountriesParams): string;
}

export class LocationPostgresQueryBuilder implements ILocationQueryBuilder {
  getAllCountries(params: ILocationHandlersGetAllCountriesParams): string {
    if (!isNil(params.countryName)) {
      return `
      SELECT * FROM countries
      WHERE name ~* '${params.countryName}'
      LIMIT ${params.limit} OFFSET ${params.skip};`;
    }

    return `SELECT * FROM countries LIMIT ${params.limit} OFFSET ${params.skip};`;
  }
}
