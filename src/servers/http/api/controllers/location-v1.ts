import { interfaces, controller, httpGet, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import status from 'http-status';
import { TYPES } from '../../ioc/types';
import { ILocationHandlersV1 } from '../../../../core/handlers';
import { locationGetAllSchema, locationGetOneCitySchema, locationGetOneCountrySchema } from '../../../schemas';
import { ILocationMapper } from '../mappers';
import { API } from '../models/schema';
import { ILocationHandlersV1GetAllCountriesParams } from '../../../../core/interfaces';

@controller('/v1/location')
export class LocationV1Controller implements interfaces.Controller {
  constructor(
    // inversify@5.0.1's inject() typings declare `targetKey: string`, which is narrower than TS's
    // ParameterDecorator contract (`string | symbol | undefined`) for constructor parameters; false positive, safe at runtime.
    // @ts-expect-error
    @inject(TYPES.locationHandlersV1) private locationHandler: ILocationHandlersV1,
    // @ts-expect-error inversify@5.0.1 inject() typings gap, see comment above (safe at runtime)
    @inject(TYPES.locationMapper) private locationMapper: ILocationMapper,
  ) {}

  @httpGet('/country')
  public async getAll(@request() req: Request, @response() res: Response): Promise<void> {
    const { skip, limit, countryName } = await locationGetAllSchema.validate<ILocationHandlersV1GetAllCountriesParams>(
      req.query,
    );
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
    const { id } = await locationGetOneCountrySchema.validate<{ id: string }>(req.params);
    const result = await this.locationHandler.getOneCountry(id);
    const response: API.GetOneCountryResponse = this.locationMapper.responseGetOneCountry(result);

    res.status(status.OK).json(response);
  }

  @httpGet('/city/:id')
  public async getOneCity(@request() req: Request, @response() res: Response): Promise<void> {
    const { id } = await locationGetOneCitySchema.validate<{ id: string }>(req.params);
    const result = await this.locationHandler.getOneCity(id);
    const response: API.GetOneCityResponse = this.locationMapper.responseGetOneCity(result);

    res.status(status.OK).json(response);
  }
}
