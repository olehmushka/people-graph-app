import { Request, Response, NextFunction } from 'express';
import { BaseLogger } from 'pino';
import Boom from '@hapi/boom';
import { InternalErrorError } from '../errors';
import { HttpError } from '../errors/types';

export interface IExpressError extends Error {
  status?: number;
  statusCode?: number;
}

export default (logger: BaseLogger) => (
  error: IExpressError,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { method, url }: Request = req;
  const { message, stack, statusCode } = error;

  if (statusCode) {
    statusCode >= 500 ? logger.error({ stack }, message) : logger.warn(message);

    res.status(statusCode).send(Boom.boomify(error, { statusCode, message }).output.payload);
  } else if (error instanceof HttpError) {
    logger.info({ method, url }, error.getMessage());
    res.status(error.getStatusCode()).send(error.getPayload());
  } else {
    const err = new InternalErrorError();
    logger.error({ stack }, message);
    res.status(err.getStatusCode()).send(err.getPayload());
  }

  return next();
};
