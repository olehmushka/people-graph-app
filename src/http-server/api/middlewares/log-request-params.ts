import { BaseLogger } from 'pino';
import { NextFunction, Response, Request } from 'express';

export default (logger: BaseLogger) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const data = {
      method: String(req.method).toLowerCase(),
      url: req.url,
      query: req.query,
      body: req.body,
    };

    logger.info(data, 'Incoming request');

    next();
  };
