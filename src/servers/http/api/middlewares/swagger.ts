import { setup } from 'swagger-ui-express';
import { BaseLogger } from 'pino';
import { RequestHandler } from 'express';
import config from '../../../../../config';

export default (logger: BaseLogger): RequestHandler => {

  const options = {
    swaggerOptions: {
      url: `${config.servers.http.swaggerBasePath.replace(/\/$/gm, '')}/swagger.json`,
    }
  };

  logger.info('Swagger ui has been generated');

  return setup(null, options);
}
