import { NextFunction, Response, Request } from 'express';
import { ILogger } from '../../../../core/lib/logger';

export default (logger: ILogger) => (req: Request, res: Response, next: NextFunction): void => {
  const data = {
    method: String(req.method).toLowerCase(),
    url: req.url,
    query: req.query,
    body: req.body,
  };

  logger.info(data, 'Incoming request');

  next();
};
