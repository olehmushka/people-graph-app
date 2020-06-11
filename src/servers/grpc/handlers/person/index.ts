import { ServerUnaryCall, sendUnaryData } from 'grpc';
import { BaseLogger } from 'pino';
import { IPersonHandlers } from '../../../../core/handlers';
import { IPersonHandlersGetAllParams } from '../../../../core/interfaces';
import { personCreateSchema, personGetAllSchema, personDeleteSchema } from '../../../schemas';
import { PersonMapper, IPersonMapper } from './mapper';
import * as pb from '../../proto/person/person_pb';
import * as gpb from '../../proto/person/person_grpc_pb';
import config from '../../../../../config';

export const service = gpb.PersonService;

export class PersonHandler implements gpb.IPersonServer {
  constructor(
    private logger: BaseLogger,
    private personHandler: IPersonHandlers,
    private personMapper: IPersonMapper,
  ) {}

  public async createOne(
    call: ServerUnaryCall<pb.CreateOneRequest>,
    callback: sendUnaryData<pb.CreateOneResponse>,
  ): Promise<void> {
    try {
      const person = this.personMapper.requestCreateOne(call);
      await personCreateSchema.validate({
        data: {
          ...person,
          birthday: person.birthday.format(config.formats.datetime),
        },
      });

      const result = await this.personHandler.createOne(person);
      const response = this.personMapper.responseCreateOne(result);

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
      const params = await personGetAllSchema.validate<IPersonHandlersGetAllParams>(
        this.personMapper.requestGetAll(call),
      );

      const persons = await this.personHandler.getAll(params);
      const response = this.personMapper.responseGetAll(persons);

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
      const { id } = await personDeleteSchema.validate({
        id: this.personMapper.requestDeleteOne(call),
      });

      await this.personHandler.deleteOne(id);
      const response = this.personMapper.responseDeleteOne();

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

export const getHandler = ({ logger, personHandler }: IPersonGrpcHandlerConfig): PersonHandler =>
  new PersonHandler(logger, personHandler, new PersonMapper());
