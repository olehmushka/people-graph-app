import { Moment } from 'moment';

export interface IBasePerson {
  firstName: string;
  lastName: string;
  birthday: Moment;
}

export interface IPerson extends IBasePerson {
  id: string;
}

export interface IPersonHandlersGetAllParams {
  skip: number;
  limit: number;
}
