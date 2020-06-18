import { interfaces, controller, httpGet, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import status from 'http-status';
import { TYPES } from '../../ioc/types';
import { ILocationHandlers } from '../../../../core/handlers';
import { locationGetAllSchema, locationGetOneCitySchema, locationGetOneCountrySchema } from '../../../schemas';
import { ILocationMapper } from '../mappers';
import { API } from '../models/schema';

@controller('/v1/location')
export class LocationV1Controller implements interfaces.Controller {
  constructor(
    @inject(TYPES.locationHandlers) private locationHandler: ILocationHandlers,
    @inject(TYPES.locationMapper) private locationMapper: ILocationMapper,
  ) {}

  @httpGet('/country')
  public async getAll(@request() req: Request, @response() res: Response): Promise<void> {
    const { skip, limit, countryName } = await locationGetAllSchema.validate(req.query);
    const result = await this.locationHandler.getAllCountries({
      skip,
      limit,
      countryName,
    });
    const response: API.GetAllCountriesResponse = this.locationMapper.responseGetAll(result);

    res.status(status.OK).json(response);
  }

  @httpGet('/country/:id')
  public async getOneCountry(@request() req: Request, @response() res: Response): Promise<void> {
    const { id } = await locationGetOneCountrySchema.validate(req.params);
    const result = await this.locationHandler.getOneCountry(id);
    const response: API.GetOneCountryResponse = this.locationMapper.responseGetOneCountry(result);

    res.status(status.OK).json(response);
  }

  @httpGet('/city/:id')
  public async getOneCity(@request() req: Request, @response() res: Response): Promise<void> {
    const { id } = await locationGetOneCitySchema.validate(req.params);
    const result = await this.locationHandler.getOneCity(id);
    const response: API.GetOneCityResponse = this.locationMapper.responseGetOneCity(result);

    res.status(status.OK).json(response);
  }
}
