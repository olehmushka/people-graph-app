export interface IBasePerson {
  firstName: string;
  lastName: string;
  birthday: Date;
}

export interface IPerson extends IBasePerson {
  id: string;
}
