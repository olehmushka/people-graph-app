import { interfaces, controller, httpGet, request, response } from 'inversify-express-utils';
import { Request, Response } from 'express';
import { version } from '../../../../../package.json';

@controller('/healthcheck')
export class HealthCheckController implements interfaces.Controller {
  @httpGet('/')
  public get(@request() _req: Request, @response() res: Response): void {
    res.json({
      data: {
        version,
        status: 'ok',
      },
      timestamp: new Date(),
    });
  }
}
