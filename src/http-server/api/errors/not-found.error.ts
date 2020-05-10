import { HttpError, IHttpOutput } from './types';

export class NotFoundError extends HttpError {
  protected create(message = "Requested resource wasn't found"): IHttpOutput {
    return this.provider.notFound(message);
  }
}
