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

export interface ICountryWithStates extends ICountry {
  states: IBaseState[];
}

export interface IBaseCity {
  id: string;
  name: string;
}

export interface ICity extends IBaseCity {
  state: IBaseState;
  country: ICountry;
}

export interface IGetAllParams {
  skip: number;
  limit: number;
}

export interface ILocationHandlersV1GetAllCountriesParams extends IGetAllParams {
  countryName?: string;
}

export interface ILocationHandlersV2GetAllCountriesParams extends IGetAllParams {}
