import { HttpError, IHttpOutput } from './types';

export class BadRequestError extends HttpError {
  protected create(message: string | object = 'Invalid request'): IHttpOutput {
    return this.provider.badRequest((message as unknown) as string);
  }
}
