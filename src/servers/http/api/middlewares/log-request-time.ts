import { BaseLogger } from 'pino';
import onFinished from 'on-finished';
import { NextFunction, Response, Request } from 'express';
import { get, set } from 'lodash';

const getMilliseconds = (time: number[]): number => Math.floor((time[0] * 1e9 + time[1]) / 1e6);

export function onFinishedHandler(req: Request, res: Response, logger: BaseLogger): () => void {
  return (): void => {
    const hrtime = get(req, '_hrtime');
    const responseTime = `${getMilliseconds(process.hrtime(hrtime))}ms`;
    const status = res.statusCode;

    const message = 'Request is finished';
    const data = {
      responseTime,
      status,
    };

    if (status >= 500) logger.error(data, message);
    else if (status >= 400) logger.warn(data, message);
    else if (status >= 200) logger.info(data, message);
    else logger.debug(data, message);
  };
}

export default (logger: BaseLogger) => (req: Request, res: Response, next: NextFunction): void => {
  set(req, '_hrtime', process.hrtime());
  onFinished(res, onFinishedHandler(req, res, logger));
  next();
};
