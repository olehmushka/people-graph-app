/**
 * This file was auto-generated by swagger-to-ts.
 * Do not make direct changes to the file.
 */

export namespace API {
  export interface State {
    id: string;
    name: string;
  }
  export interface PersonDeleteOneResponse {
    timestamp: string;
    data: PersonDeleteOneResponseData;
  }
  export interface PersonDeleteOneResponseData {
    status: string;
  }
  export interface PersonCreateOneResponse {
    timestamp: string;
    data: PersonCreateOneResponseData;
  }
  export interface PersonCreateOneResponseData {
    id: string;
    firstName: string;
    lastName: string;
    birthday: string;
  }
  export interface PersonCreateOneRequest {
    data: PersonCreateOneRequestData;
  }
  export interface PersonCreateOneRequestData {
    firstName: string;
    lastName: string;
    birthday: string;
  }
  export interface GetOneCountryResponse {
    timestamp: string;
    data: GetOneCountryResponseData;
  }
  export interface GetOneCountryResponseData {
    id: string;
    name: string;
    alpha2Code: string;
    alpha3Code: string;
    states: State[];
  }
  export interface GetOneCityResponse {
    timestamp: string;
    data: GetOneCityResponseData;
  }
  export interface GetOneCityResponseData {
    id: string;
    name: string;
    state: State;
    country: Country;
  }
  export interface GetAllPersonsResponse {
    timestamp: string;
    data: GetAllPersonsResponseData[];
  }
  export interface GetAllPersonsResponseData {
    id: string;
    firstName: string;
    lastName: string;
    birthday: string;
  }
  export interface GetAllCountriesResponse {
    timestamp: string;
    data: Country[];
  }
  export interface Country {
    id: string;
    name: string;
    alpha2Code: string;
    alpha3Code: string;
  }
}
