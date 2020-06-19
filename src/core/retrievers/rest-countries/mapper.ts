import { ICountry } from '../../interfaces';

export interface IRestCountriesV2Currency {
  code: string;
  name: string;
  symbol: string;
}

export interface IRestCountriesV2Language {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

export interface IRestCountriesV2RegionalBlocs {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}

export interface IRestCountriesV2Country {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: number;
  latlng: number[];
  demonym: string;
  area: number;
  gini: number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: IRestCountriesV2Currency[];
  languages: IRestCountriesV2Language[];
  translations: { [key: string]: string };
  flag: string;
  regionalBlocs: IRestCountriesV2RegionalBlocs[];
  cioc: string;
}

export interface IRestCountriesMapper {
  getCountries(response: IRestCountriesV2Country[]): ICountry[];
}

export class RestCountriesMapper {
  public getCountries(response: IRestCountriesV2Country[]): ICountry[] {
    return response.map((country) => ({
      id: '',
      name: country.name,
      alpha2Code: country.alpha2Code,
      alpha3Code: country.alpha3Code,
    }));
  }
}
