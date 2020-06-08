import {
  interfaces,
  controller,
  httpGet,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import status from 'http-status';
import { TYPES } from '../../ioc/types';
import { ILocationHandlers } from '../../../../core/handlers';
import { locationGetAllSchema } from '../../../schemas';
import { ILocationMapper } from '../mappers';
import { API } from '../models/schema';

@controller('/location')
export class LocationController implements interfaces.Controller {
  constructor(
    @inject(TYPES.locationHandlers) private locationHandler: ILocationHandlers,
    @inject(TYPES.locationMapper) private locationMapper: ILocationMapper,
  ) {}

  @httpGet('/country')
  public async getAll(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    const {
      skip,
      limit,
      countryName,
    } = await locationGetAllSchema.validateAsync(req.query);
    const result = await this.locationHandler.getAllCountries({
      skip,
      limit,
      countryName,
    });
    const response: API.GetAllCountriesResponse = this.locationMapper.responseGetAll(
      result,
    );

    res.status(status.OK).json(response);
  }
}
