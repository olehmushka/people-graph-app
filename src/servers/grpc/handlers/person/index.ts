import { ServerUnaryCall, sendUnaryData } from 'grpc';
import { BaseLogger } from 'pino';
import { IPersonHandlers } from '../../../../core/handlers';
import {
  personCreateSchema,
  personGetAllSchema,
  personDeleteSchema,
} from '../../../schemas';
import * as pb from '../../proto/person/person_pb';
import * as gpb from '../../proto/person/person_grpc_pb';

export const service = gpb.PersonService;

export class PersonHandler implements gpb.IPersonServer {
  constructor(
    private logger: BaseLogger,
    private personHandler: IPersonHandlers,
  ) {}

  public async createOne(
    call: ServerUnaryCall<pb.CreateOneRequest>,
    callback: sendUnaryData<pb.CreateOneResponse>,
  ): Promise<void> {
    try {
      const requestData = call.request.getData();
      const person = await personCreateSchema.validateAsync({
        data: {
          firstName: requestData?.getFirstname(),
          lastName: requestData?.getLastname(),
          birthday: requestData?.getBirthday(),
        },
      });

      const data = await this.personHandler.createOne(person.data);

      const response = new pb.CreateOneResponse();
      const responseData = new pb.CreateOneResponse.CreateOneResponseData();
      responseData.setId(data.id);
      responseData.setFirstname(data.firstName);
      responseData.setLastname(data.lastName);
      responseData.setBirthday(data.birthday.toISOString());
      response.setData(responseData);

      response.setTimestamp(new Date().toISOString());

      callback(null, response);
    } catch (error) {
      const { stack, message } = error;
      this.logger.error({ stack, message }, 'Person Handler create one error');
      callback(error, null);
    }
  }
  public async getAll(
    call: ServerUnaryCall<pb.GetAllRequest>,
    callback: sendUnaryData<pb.GetAllResponse>,
  ): Promise<void> {
    try {
      const params = await personGetAllSchema.validateAsync({
        limit: call.request.getLimit(),
        skip: call.request.getSkip(),
      });

      const persons = await this.personHandler.getAll(params);

      const response = new pb.GetAllResponse();
      const responseData = persons.map((person) => {
        const data = new pb.GetAllResponse.GetAllResponseData();
        data.setId(person.id);
        data.setFirstname(person.firstName);
        data.setLastname(person.lastName);
        data.setBirthday(person.birthday.toISOString());

        return data;
      });
      response.setDataList(responseData);

      response.setTimestamp(new Date().toISOString());

      callback(null, response);
    } catch (error) {
      const { stack, message } = error;
      this.logger.error({ stack, message }, 'Person Handler get all error');
      callback(error, null);
    }
  }
  public async deleteOne(
    call: ServerUnaryCall<pb.DeleteOneRequest>,
    callback: sendUnaryData<pb.DeleteOneResponse>,
  ): Promise<void> {
    try {
      const { id } = await personDeleteSchema.validateAsync({
        id: call.request.getId(),
      });

      await this.personHandler.deleteOne(id);

      const response = new pb.DeleteOneResponse();

      callback(null, response);
    } catch (error) {
      const { stack, message } = error;
      this.logger.error({ stack, message }, 'Person Handler delete one error');
      callback(error, null);
    }
  }
}

export interface IPersonGrpcHandlerConfig {
  logger: BaseLogger;
  personHandler: IPersonHandlers;
}

export const getHandler = ({
  logger,
  personHandler,
}: IPersonGrpcHandlerConfig): PersonHandler =>
  new PersonHandler(logger, personHandler);
