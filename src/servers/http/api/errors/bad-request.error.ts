import { HttpError, IHttpOutput } from './types';

export class BadRequestError extends HttpError {
  protected create(message = 'Invalid data in request'): IHttpOutput {
    return this.provider.badRequest(message);
  }
}
