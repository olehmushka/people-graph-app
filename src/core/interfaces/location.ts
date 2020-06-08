export interface ICountry {
  id: string;
  name: string;
  alpha2Code: string;
  alpha3Code: string;
}

export interface IBaseState {
  id: string;
  name: string;
}

export interface IState extends IBaseState {
  country: ICountry;
}

export interface IBaseCity {
  id: string;
  name: string;
}

export interface ICity extends IBaseCity {
  state: IBaseState;
  country: ICountry;
}

export interface ILocationHandlersGetAllParams {
  skip: number;
  limit: number;
}

export interface ILocationHandlersGetAllCountriesParams
  extends ILocationHandlersGetAllParams {}
