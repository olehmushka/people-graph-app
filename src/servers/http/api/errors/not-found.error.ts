import { HttpError, IHttpOutput } from './types';

export class NotFoundError extends HttpError {
  protected create(message = 'Requested resource was not found'): IHttpOutput {
    return this.provider.notFound(message);
  }
}
