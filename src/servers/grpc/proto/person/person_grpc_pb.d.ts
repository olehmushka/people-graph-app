// package: person
// file: person.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from 'grpc';
import * as person_pb from './person_pb';

interface IPersonService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  createOne: IPersonService_IcreateOne;
  getAll: IPersonService_IgetAll;
  deleteOne: IPersonService_IdeleteOne;
}

interface IPersonService_IcreateOne
  extends grpc.MethodDefinition<person_pb.CreateOneRequest, person_pb.CreateOneResponse> {
  path: string; // "/person.Person/createOne"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<person_pb.CreateOneRequest>;
  requestDeserialize: grpc.deserialize<person_pb.CreateOneRequest>;
  responseSerialize: grpc.serialize<person_pb.CreateOneResponse>;
  responseDeserialize: grpc.deserialize<person_pb.CreateOneResponse>;
}
interface IPersonService_IgetAll extends grpc.MethodDefinition<person_pb.GetAllRequest, person_pb.GetAllResponse> {
  path: string; // "/person.Person/getAll"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<person_pb.GetAllRequest>;
  requestDeserialize: grpc.deserialize<person_pb.GetAllRequest>;
  responseSerialize: grpc.serialize<person_pb.GetAllResponse>;
  responseDeserialize: grpc.deserialize<person_pb.GetAllResponse>;
}
interface IPersonService_IdeleteOne
  extends grpc.MethodDefinition<person_pb.DeleteOneRequest, person_pb.DeleteOneResponse> {
  path: string; // "/person.Person/deleteOne"
  requestStream: boolean; // false
  responseStream: boolean; // false
  requestSerialize: grpc.serialize<person_pb.DeleteOneRequest>;
  requestDeserialize: grpc.deserialize<person_pb.DeleteOneRequest>;
  responseSerialize: grpc.serialize<person_pb.DeleteOneResponse>;
  responseDeserialize: grpc.deserialize<person_pb.DeleteOneResponse>;
}

export const PersonService: IPersonService;

export interface IPersonServer {
  createOne: grpc.handleUnaryCall<person_pb.CreateOneRequest, person_pb.CreateOneResponse>;
  getAll: grpc.handleUnaryCall<person_pb.GetAllRequest, person_pb.GetAllResponse>;
  deleteOne: grpc.handleUnaryCall<person_pb.DeleteOneRequest, person_pb.DeleteOneResponse>;
}

export interface IPersonClient {
  createOne(
    request: person_pb.CreateOneRequest,
    callback: (error: grpc.ServiceError | null, response: person_pb.CreateOneResponse) => void,
  ): grpc.ClientUnaryCall;
  createOne(
    request: person_pb.CreateOneRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: person_pb.CreateOneResponse) => void,
  ): grpc.ClientUnaryCall;
  createOne(
    request: person_pb.CreateOneRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: person_pb.CreateOneResponse) => void,
  ): grpc.ClientUnaryCall;
  getAll(
    request: person_pb.GetAllRequest,
    callback: (error: grpc.ServiceError | null, response: person_pb.GetAllResponse) => void,
  ): grpc.ClientUnaryCall;
  getAll(
    request: person_pb.GetAllRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: person_pb.GetAllResponse) => void,
  ): grpc.ClientUnaryCall;
  getAll(
    request: person_pb.GetAllRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: person_pb.GetAllResponse) => void,
  ): grpc.ClientUnaryCall;
  deleteOne(
    request: person_pb.DeleteOneRequest,
    callback: (error: grpc.ServiceError | null, response: person_pb.DeleteOneResponse) => void,
  ): grpc.ClientUnaryCall;
  deleteOne(
    request: person_pb.DeleteOneRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: person_pb.DeleteOneResponse) => void,
  ): grpc.ClientUnaryCall;
  deleteOne(
    request: person_pb.DeleteOneRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: person_pb.DeleteOneResponse) => void,
  ): grpc.ClientUnaryCall;
}

export class PersonClient extends grpc.Client implements IPersonClient {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  public createOne(
    request: person_pb.CreateOneRequest,
    callback: (error: grpc.ServiceError | null, response: person_pb.CreateOneResponse) => void,
  ): grpc.ClientUnaryCall;
  public createOne(
    request: person_pb.CreateOneRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: person_pb.CreateOneResponse) => void,
  ): grpc.ClientUnaryCall;
  public createOne(
    request: person_pb.CreateOneRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: person_pb.CreateOneResponse) => void,
  ): grpc.ClientUnaryCall;
  public getAll(
    request: person_pb.GetAllRequest,
    callback: (error: grpc.ServiceError | null, response: person_pb.GetAllResponse) => void,
  ): grpc.ClientUnaryCall;
  public getAll(
    request: person_pb.GetAllRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: person_pb.GetAllResponse) => void,
  ): grpc.ClientUnaryCall;
  public getAll(
    request: person_pb.GetAllRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: person_pb.GetAllResponse) => void,
  ): grpc.ClientUnaryCall;
  public deleteOne(
    request: person_pb.DeleteOneRequest,
    callback: (error: grpc.ServiceError | null, response: person_pb.DeleteOneResponse) => void,
  ): grpc.ClientUnaryCall;
  public deleteOne(
    request: person_pb.DeleteOneRequest,
    metadata: grpc.Metadata,
    callback: (error: grpc.ServiceError | null, response: person_pb.DeleteOneResponse) => void,
  ): grpc.ClientUnaryCall;
  public deleteOne(
    request: person_pb.DeleteOneRequest,
    metadata: grpc.Metadata,
    options: Partial<grpc.CallOptions>,
    callback: (error: grpc.ServiceError | null, response: person_pb.DeleteOneResponse) => void,
  ): grpc.ClientUnaryCall;
}
