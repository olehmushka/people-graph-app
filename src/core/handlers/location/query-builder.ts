import { ILocationHandlersGetAllCountriesParams } from '../../interfaces';

export interface ILocationQueryBuilder {
  getAllCountries(params: ILocationHandlersGetAllCountriesParams): string;
}

export class LocationPostgresQueryBuilder implements ILocationQueryBuilder {
  getAllCountries(params: ILocationHandlersGetAllCountriesParams): string {
    return `SELECT * FROM countries LIMIT ${params.limit} OFFSET ${params.skip};`;
  }
}
