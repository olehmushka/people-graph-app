import { setup } from 'swagger-ui-express';
import { RequestHandler } from 'express';
import config from '../../../../../config';
import { ILogger } from '../../../../core/lib/logger';

export default (logger: ILogger): RequestHandler => {
  const options = {
    swaggerOptions: {
      url: `${config.servers.http.swaggerBasePath.replace(/\/$/gm, '')}/swagger.json`,
    },
  };

  logger.info('Swagger ui has been generated');

  return setup(null, options);
};
