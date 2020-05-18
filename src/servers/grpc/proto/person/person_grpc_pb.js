// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var person_pb = require('./person_pb.js');

function serialize_person_CreateOneRequest(arg) {
  if (!(arg instanceof person_pb.CreateOneRequest)) {
    throw new Error('Expected argument of type person.CreateOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_person_CreateOneRequest(buffer_arg) {
  return person_pb.CreateOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_person_CreateOneResponse(arg) {
  if (!(arg instanceof person_pb.CreateOneResponse)) {
    throw new Error('Expected argument of type person.CreateOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_person_CreateOneResponse(buffer_arg) {
  return person_pb.CreateOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_person_DeleteOneRequest(arg) {
  if (!(arg instanceof person_pb.DeleteOneRequest)) {
    throw new Error('Expected argument of type person.DeleteOneRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_person_DeleteOneRequest(buffer_arg) {
  return person_pb.DeleteOneRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_person_DeleteOneResponse(arg) {
  if (!(arg instanceof person_pb.DeleteOneResponse)) {
    throw new Error('Expected argument of type person.DeleteOneResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_person_DeleteOneResponse(buffer_arg) {
  return person_pb.DeleteOneResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_person_GetAllRequest(arg) {
  if (!(arg instanceof person_pb.GetAllRequest)) {
    throw new Error('Expected argument of type person.GetAllRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_person_GetAllRequest(buffer_arg) {
  return person_pb.GetAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_person_GetAllResponse(arg) {
  if (!(arg instanceof person_pb.GetAllResponse)) {
    throw new Error('Expected argument of type person.GetAllResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_person_GetAllResponse(buffer_arg) {
  return person_pb.GetAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var PersonService = exports.PersonService = {
  createOne: {
    path: '/person.Person/createOne',
    requestStream: false,
    responseStream: false,
    requestType: person_pb.CreateOneRequest,
    responseType: person_pb.CreateOneResponse,
    requestSerialize: serialize_person_CreateOneRequest,
    requestDeserialize: deserialize_person_CreateOneRequest,
    responseSerialize: serialize_person_CreateOneResponse,
    responseDeserialize: deserialize_person_CreateOneResponse,
  },
  getAll: {
    path: '/person.Person/getAll',
    requestStream: false,
    responseStream: false,
    requestType: person_pb.GetAllRequest,
    responseType: person_pb.GetAllResponse,
    requestSerialize: serialize_person_GetAllRequest,
    requestDeserialize: deserialize_person_GetAllRequest,
    responseSerialize: serialize_person_GetAllResponse,
    responseDeserialize: deserialize_person_GetAllResponse,
  },
  deleteOne: {
    path: '/person.Person/deleteOne',
    requestStream: false,
    responseStream: false,
    requestType: person_pb.DeleteOneRequest,
    responseType: person_pb.DeleteOneResponse,
    requestSerialize: serialize_person_DeleteOneRequest,
    requestDeserialize: deserialize_person_DeleteOneRequest,
    responseSerialize: serialize_person_DeleteOneResponse,
    responseDeserialize: deserialize_person_DeleteOneResponse,
  },
};

exports.PersonClient = grpc.makeGenericClientConstructor(PersonService);
