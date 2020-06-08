import { QueryResult } from 'pg';
import { ICountry } from '../../interfaces';

export interface ILocationRowCountry {
  id: string;
  name: string;
  alpha_two_code: string;
  alpha_three_code: string;
  phone_codes: string;
}

export interface ILocationPostgresParser {
  getAllCountries(queryResult: QueryResult<ILocationRowCountry>): ICountry[];
}

export class LocationPostgresParser implements ILocationPostgresParser {
  public getAllCountries(
    queryResult: QueryResult<ILocationRowCountry>,
  ): ICountry[] {
    return queryResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      alpha2Code: row.alpha_two_code,
      alpha3Code: row.alpha_three_code,
    }));
  }
}
