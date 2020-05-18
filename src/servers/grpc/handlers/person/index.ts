import { ServerUnaryCall, sendUnaryData } from 'grpc';
import { BaseLogger } from 'pino';
import { IPersonHandlers } from '../../../../core/handlers';
import * as pb from '../../proto/person/person_pb';
import * as gpb from '../../proto/person/person_grpc_pb';

class PersonHandler implements gpb.IPersonServer {
  constructor(
    private logger: BaseLogger,
    private personHandler: IPersonHandlers,
  ) {}

  public async createOne(
    call: ServerUnaryCall<pb.CreateOneRequest>,
    callback: sendUnaryData<pb.CreateOneResponse>,
  ) {
    // todo
  }
  public async getAll(
    call: ServerUnaryCall<pb.GetAllRequest>,
    callback: sendUnaryData<pb.GetAllResponse>,
  ) {
    // todo
  }
  public async deleteOne(
    call: ServerUnaryCall<pb.DeleteOneRequest>,
    callback: sendUnaryData<pb.DeleteOneResponse>,
  ) {
    // todo
  }
}

export default {
  service: gpb.PersonService,
  handler: PersonHandler,
};
