import { interfaces, controller, httpGet, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import status from 'http-status';
import { TYPES } from '../../ioc/types';
import { ILocationHandlersV2 } from '../../../../core/handlers';

@controller('/v2/location')
export class LocationV2Controller implements interfaces.Controller {
  constructor(@inject(TYPES.locationHandlersV2) private locationHandler: ILocationHandlersV2) {}

  @httpGet('/country')
  public async getAll(@request() req: Request, @response() res: Response): Promise<void> {
    const data = await this.locationHandler.getAllCountries({
      skip: 0,
      limit: 0,
    });

    res.status(status.OK).json({ data });
  }
}
