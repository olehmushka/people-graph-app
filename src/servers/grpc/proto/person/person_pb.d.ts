// package: person
// file: person.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from 'google-protobuf';

export class CreateOneRequest extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): CreateOneRequest.CreateOneRequestData | undefined;
  setData(value?: CreateOneRequest.CreateOneRequestData): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOneRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreateOneRequest,
  ): CreateOneRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CreateOneRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreateOneRequest;
  static deserializeBinaryFromReader(
    message: CreateOneRequest,
    reader: jspb.BinaryReader,
  ): CreateOneRequest;
}

export namespace CreateOneRequest {
  export type AsObject = {
    data?: CreateOneRequest.CreateOneRequestData.AsObject;
  };

  export class CreateOneRequestData extends jspb.Message {
    getFirstname(): string;
    setFirstname(value: string): void;

    getLastname(): string;
    setLastname(value: string): void;

    getBirthday(): string;
    setBirthday(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOneRequestData.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: CreateOneRequestData,
    ): CreateOneRequestData.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: CreateOneRequestData,
      writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): CreateOneRequestData;
    static deserializeBinaryFromReader(
      message: CreateOneRequestData,
      reader: jspb.BinaryReader,
    ): CreateOneRequestData;
  }

  export namespace CreateOneRequestData {
    export type AsObject = {
      firstname: string;
      lastname: string;
      birthday: string;
    };
  }
}

export class CreateOneResponse extends jspb.Message {
  hasData(): boolean;
  clearData(): void;
  getData(): CreateOneResponse.CreateOneResponseData | undefined;
  setData(value?: CreateOneResponse.CreateOneResponseData): void;

  getTimestamp(): string;
  setTimestamp(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CreateOneResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: CreateOneResponse,
  ): CreateOneResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: CreateOneResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): CreateOneResponse;
  static deserializeBinaryFromReader(
    message: CreateOneResponse,
    reader: jspb.BinaryReader,
  ): CreateOneResponse;
}

export namespace CreateOneResponse {
  export type AsObject = {
    data?: CreateOneResponse.CreateOneResponseData.AsObject;
    timestamp: string;
  };

  export class CreateOneResponseData extends jspb.Message {
    getId(): string;
    setId(value: string): void;

    getFirstname(): string;
    setFirstname(value: string): void;

    getLastname(): string;
    setLastname(value: string): void;

    getBirthday(): string;
    setBirthday(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateOneResponseData.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: CreateOneResponseData,
    ): CreateOneResponseData.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: CreateOneResponseData,
      writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): CreateOneResponseData;
    static deserializeBinaryFromReader(
      message: CreateOneResponseData,
      reader: jspb.BinaryReader,
    ): CreateOneResponseData;
  }

  export namespace CreateOneResponseData {
    export type AsObject = {
      id: string;
      firstname: string;
      lastname: string;
      birthday: string;
    };
  }
}

export class GetAllRequest extends jspb.Message {
  getLimit(): number;
  setLimit(value: number): void;

  getSkip(): number;
  setSkip(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetAllRequest,
  ): GetAllRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetAllRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetAllRequest;
  static deserializeBinaryFromReader(
    message: GetAllRequest,
    reader: jspb.BinaryReader,
  ): GetAllRequest;
}

export namespace GetAllRequest {
  export type AsObject = {
    limit: number;
    skip: number;
  };
}

export class GetAllResponse extends jspb.Message {
  clearDataList(): void;
  getDataList(): Array<GetAllResponse.GetAllResponseData>;
  setDataList(value: Array<GetAllResponse.GetAllResponseData>): void;
  addData(
    value?: GetAllResponse.GetAllResponseData,
    index?: number,
  ): GetAllResponse.GetAllResponseData;

  getTimestamp(): string;
  setTimestamp(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetAllResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: GetAllResponse,
  ): GetAllResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: GetAllResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): GetAllResponse;
  static deserializeBinaryFromReader(
    message: GetAllResponse,
    reader: jspb.BinaryReader,
  ): GetAllResponse;
}

export namespace GetAllResponse {
  export type AsObject = {
    dataList: Array<GetAllResponse.GetAllResponseData.AsObject>;
    timestamp: string;
  };

  export class GetAllResponseData extends jspb.Message {
    getId(): string;
    setId(value: string): void;

    getFirstname(): string;
    setFirstname(value: string): void;

    getLastname(): string;
    setLastname(value: string): void;

    getBirthday(): string;
    setBirthday(value: string): void;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAllResponseData.AsObject;
    static toObject(
      includeInstance: boolean,
      msg: GetAllResponseData,
    ): GetAllResponseData.AsObject;
    static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
    static extensionsBinary: {
      [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
    };
    static serializeBinaryToWriter(
      message: GetAllResponseData,
      writer: jspb.BinaryWriter,
    ): void;
    static deserializeBinary(bytes: Uint8Array): GetAllResponseData;
    static deserializeBinaryFromReader(
      message: GetAllResponseData,
      reader: jspb.BinaryReader,
    ): GetAllResponseData;
  }

  export namespace GetAllResponseData {
    export type AsObject = {
      id: string;
      firstname: string;
      lastname: string;
      birthday: string;
    };
  }
}

export class DeleteOneRequest extends jspb.Message {
  getId(): string;
  setId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOneRequest.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DeleteOneRequest,
  ): DeleteOneRequest.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DeleteOneRequest,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOneRequest;
  static deserializeBinaryFromReader(
    message: DeleteOneRequest,
    reader: jspb.BinaryReader,
  ): DeleteOneRequest;
}

export namespace DeleteOneRequest {
  export type AsObject = {
    id: string;
  };
}

export class DeleteOneResponse extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): DeleteOneResponse.AsObject;
  static toObject(
    includeInstance: boolean,
    msg: DeleteOneResponse,
  ): DeleteOneResponse.AsObject;
  static extensions: { [key: number]: jspb.ExtensionFieldInfo<jspb.Message> };
  static extensionsBinary: {
    [key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>;
  };
  static serializeBinaryToWriter(
    message: DeleteOneResponse,
    writer: jspb.BinaryWriter,
  ): void;
  static deserializeBinary(bytes: Uint8Array): DeleteOneResponse;
  static deserializeBinaryFromReader(
    message: DeleteOneResponse,
    reader: jspb.BinaryReader,
  ): DeleteOneResponse;
}

export namespace DeleteOneResponse {
  export type AsObject = {};
}
