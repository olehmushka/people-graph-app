import { HttpError, IHttpOutput } from './types';

export class InternalErrorError extends HttpError {
  protected create(message = 'Internal Server Error'): IHttpOutput {
    return this.provider.internal(message);
  }
}
