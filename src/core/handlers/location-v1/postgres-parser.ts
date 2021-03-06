import { QueryResult } from 'pg';
import { ICountry, ICountryWithStates, ICity } from '../../interfaces';

export interface ILocationRowCountry {
  id: string;
  name: string;
  alpha_two_code: string;
  alpha_three_code: string;
  phone_codes: string;
}

export interface ILocationRowFullCity {
  city_id: string;
  city_name: string;
  state_id: string;
  state_name: string;
  country_id: string;
  country_name: string;
  country_alpha_two_code: string;
  country_alpha_three_code: string;
}

export interface ILocationRawFullCountry {
  country_id: string;
  country_name: string;
  country_alpha_two_code: string;
  country_alpha_three_code: string;
  country_states: string;
}

export interface ILocationPostgresParser {
  getAllCountries(queryResult: QueryResult<ILocationRowCountry>): ICountry[];
  getOneCountry(queryResult: QueryResult<ILocationRawFullCountry>): ICountryWithStates[];
  getOneCity(queryResult: QueryResult<ILocationRowFullCity>): ICity[];
}

export class LocationPostgresParser implements ILocationPostgresParser {
  public getAllCountries(queryResult: QueryResult<ILocationRowCountry>): ICountry[] {
    return queryResult.rows.map((row) => ({
      id: row.id,
      name: row.name,
      alpha2Code: row.alpha_two_code,
      alpha3Code: row.alpha_three_code,
    }));
  }

  public getOneCountry(queryResult: QueryResult<ILocationRawFullCountry>): ICountryWithStates[] {
    return queryResult.rows.map((row) => ({
      id: row.country_id,
      name: row.country_name,
      alpha2Code: row.country_alpha_two_code,
      alpha3Code: row.country_alpha_three_code,
      states: JSON.parse(row.country_states).map((state: { id: string; name: string }) => ({
        id: state.id,
        name: state.name,
      })),
    }));
  }

  public getOneCity(queryResult: QueryResult<ILocationRowFullCity>): ICity[] {
    return queryResult.rows.map((row) => ({
      id: row.city_id,
      name: row.city_name,
      state: {
        id: row.state_id,
        name: row.state_name,
      },
      country: {
        id: row.country_id,
        name: row.country_name,
        alpha2Code: row.country_alpha_two_code,
        alpha3Code: row.country_alpha_three_code,
      },
    }));
  }
}
