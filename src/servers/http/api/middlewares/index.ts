import { Application, RequestHandler } from 'express';
import bodyParser from 'body-parser';
import { serve } from 'swagger-ui-express';
import path from 'path';
import logRequestTime from './log-request-time';
import swagger from './swagger';
import notFound from './404-handling';
import errorHandling from './error-handling';
import logRequestParams from './log-request-params';
import config from '../../../../../config';
import { ILogger } from '../../../../core/lib/logger';

export default ({ logger }: IDependencies) => (app: Application): void => {
  app.use(logRequestParams(logger));
  app.use(logRequestTime(logger));
  app.use(path.resolve(`${config.servers.http.basePath}`, 'swagger-ui'), serve, swagger(logger) as RequestHandler);
  app.use(bodyParser.json());
};

export const errors = ({ logger }: IDependencies) => (app: Application): void => {
  app.use(notFound);
  app.use(errorHandling(logger));
};

export interface IDependencies {
  logger: ILogger;
}
