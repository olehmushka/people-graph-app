import Boom from '@hapi/boom';
import omit from 'lodash/omit';

export interface IInfoPayload {
  error: string;
  message: string;
}

export interface IPayload extends IInfoPayload {
  statusCode: number;
}

export interface IHttpError {
  getPayload(): IInfoPayload;
  getStatusCode(): number;
  getMessage(): string;
}

export interface IHttpOutput {
  output: {
    payload: IPayload;
  };
}

export abstract class HttpError extends Error implements IHttpError {
  protected payload: IPayload;
  protected provider: typeof Boom;

  constructor(...args: any[]) {
    super(...args);
    this.provider = Boom;

    const { output } = this.create(args[0]);

    this.payload = output.payload;
  }

  public getPayload(): IInfoPayload {
    return omit(this.payload, ['statusCode']);
  }

  public getStatusCode(): number {
    return this.payload.statusCode;
  }

  public getMessage(): string {
    return this.payload.message;
  }

  protected abstract create(message: string): IHttpOutput;
}
