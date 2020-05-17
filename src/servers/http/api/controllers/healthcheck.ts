import { interfaces, controller, httpGet, request } from 'inversify-express-utils';
import { Request } from 'express';
import { version } from '../../../../../package.json';

@controller('/healthcheck')
export class HealthCheckController implements interfaces.Controller {
  @httpGet('/')
  public get(@request() req: Request): IControllerResponse {
    const timestamp = new Date();
    return {
      data: {
        version,
        status: 'ok',
      },
      timestamp,
    };
  }
}
