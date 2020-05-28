import moment from 'moment';
import { injectable } from 'inversify';
import { API } from '../models/schema';
import { IBasePerson, IPerson } from '../../../../core/interfaces';
import config from '../../../../../config';

export interface IPersonMapper {
  requestCreateOne(request: API.PersonCreateOneRequest): IBasePerson;
  responseCreateOne(response: IPerson): API.PersonCreateOneResponse;
  responseGetAll(response: IPerson[]): API.GetAllPersonsResponse;
  responseDeleteOne(): API.PersonDeleteOneResponse;
}

@injectable()
export class PersonMapper implements IPersonMapper {
  public requestCreateOne(request: API.PersonCreateOneRequest): IBasePerson {
    return {
      firstName: request.data.firstName,
      lastName: request.data.lastName,
      birthday: moment(request.data.birthday),
    };
  }

  public responseCreateOne(response: IPerson): API.PersonCreateOneResponse {
    return {
      data: {
        id: response.id,
        firstName: response.firstName,
        lastName: response.lastName,
        birthday: response.birthday.format(config.formats.datetime),
      },
      timestamp: moment().format(config.formats.datetime),
    };
  }

  public responseGetAll(response: IPerson[]): API.GetAllPersonsResponse {
    return {
      data: response.map((person) => ({
        id: person.id,
        firstName: person.firstName,
        lastName: person.lastName,
        birthday: person.birthday.format(config.formats.datetime),
      })),
      timestamp: moment().format(config.formats.datetime),
    };
  }

  public responseDeleteOne(): API.PersonDeleteOneResponse {
    return {
      data: {
        status: 'ok',
      },
      timestamp: moment().format(config.formats.datetime),
    };
  }
}
