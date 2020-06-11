import moment from 'moment';
import { ServerUnaryCall } from 'grpc';
import * as pb from '../../proto/person/person_pb';
import { IBasePerson, IPerson, IPersonHandlersGetAllParams } from '../../../../core/interfaces';
import config from '../../../../../config';

export interface IPersonMapper {
  requestCreateOne(call: ServerUnaryCall<pb.CreateOneRequest>): IBasePerson;
  responseCreateOne(response: IPerson): pb.CreateOneResponse;
  requestGetAll(call: ServerUnaryCall<pb.GetAllRequest>): IPersonHandlersGetAllParams;
  responseGetAll(response: IPerson[]): pb.GetAllResponse;
  requestDeleteOne(call: ServerUnaryCall<pb.DeleteOneRequest>): string;
  responseDeleteOne(): pb.DeleteOneResponse;
}

export class PersonMapper implements IPersonMapper {
  public requestCreateOne(call: ServerUnaryCall<pb.CreateOneRequest>): IBasePerson {
    const requestData = call.request.getData();

    return {
      firstName: requestData?.getFirstname() ?? '',
      lastName: requestData?.getLastname() ?? '',
      birthday: requestData?.getBirthday() ? moment(requestData.getBirthday()) : moment(),
    };
  }

  public responseCreateOne(result: IPerson): pb.CreateOneResponse {
    const response = new pb.CreateOneResponse();

    const responseData = new pb.CreateOneResponse.CreateOneResponseData();
    responseData.setId(result.id);
    responseData.setFirstname(result.firstName);
    responseData.setLastname(result.lastName);
    responseData.setBirthday(result.birthday.format(config.formats.datetime));
    response.setData(responseData);

    response.setTimestamp(moment().format(config.formats.datetime));

    return response;
  }

  public requestGetAll(call: ServerUnaryCall<pb.GetAllRequest>): IPersonHandlersGetAllParams {
    return {
      limit: call.request.getLimit(),
      skip: call.request.getSkip(),
    };
  }

  public responseGetAll(result: IPerson[]): pb.GetAllResponse {
    const response = new pb.GetAllResponse();

    const responseData = result.map((person) => {
      const data = new pb.GetAllResponse.GetAllResponseData();
      data.setId(person.id);
      data.setFirstname(person.firstName);
      data.setLastname(person.lastName);
      data.setBirthday(person.birthday.format(config.formats.datetime));

      return data;
    });
    response.setDataList(responseData);

    response.setTimestamp(moment().format(config.formats.datetime));

    return response;
  }

  public requestDeleteOne(call: ServerUnaryCall<pb.DeleteOneRequest>): string {
    return call.request.getId();
  }

  public responseDeleteOne(): pb.DeleteOneResponse {
    const response = new pb.DeleteOneResponse();

    const responseData = new pb.DeleteOneResponse.DeleteOneResponseData();
    responseData.setStatus('ok');
    response.setData(responseData);
    response.setTimestamp(moment().format(config.formats.datetime));

    return response;
  }
}
