import { interfaces, controller, httpPost, httpGet, httpDelete, request, response } from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import status from 'http-status';
import { TYPES } from '../../ioc/types';
import { IPersonHandlers } from '../../../../core/handlers';
import { personCreateSchema, personGetAllSchema, personDeleteSchema } from '../../../schemas';
import { IPersonMapper } from '../mappers';
import { API } from '../models/schema';
import { IPersonHandlersGetAllParams } from '../../../../core/interfaces';

@controller('/person')
export class PersonController implements interfaces.Controller {
  constructor(
    // inversify@5.0.1's inject() typings declare `targetKey: string`, which is narrower than TS's
    // ParameterDecorator contract (`string | symbol | undefined`) for constructor parameters; false positive, safe at runtime.
    // @ts-expect-error
    @inject(TYPES.personHandlers) private personHandler: IPersonHandlers,
    // @ts-expect-error inversify@5.0.1 inject() typings gap, see comment above (safe at runtime)
    @inject(TYPES.personMapper) private personMapper: IPersonMapper,
  ) {}

  @httpPost('/')
  public async createOne(@request() req: Request, @response() res: Response): Promise<void> {
    const request: API.PersonCreateOneRequest = await personCreateSchema.validate(
      req.body as API.PersonCreateOneRequest,
    );
    const result = await this.personHandler.createOne(this.personMapper.requestCreateOne(request));
    const response: API.PersonCreateOneResponse = this.personMapper.responseCreateOne(result);

    res.status(status.CREATED).json(response);
  }

  @httpGet('/')
  public async getAll(@request() req: Request, @response() res: Response): Promise<void> {
    const { skip, limit } = await personGetAllSchema.validate<IPersonHandlersGetAllParams>(req.query);
    const result = await this.personHandler.getAll({ skip, limit });
    const response: API.GetAllPersonsResponse = this.personMapper.responseGetAll(result);

    res.status(status.OK).json(response);
  }

  @httpDelete('/:id')
  public async deleteOne(@request() req: Request, @response() res: Response): Promise<void> {
    const { id } = await personDeleteSchema.validate<{ id: string }>(req.params);
    await this.personHandler.deleteOne(id);
    const response: API.PersonDeleteOneResponse = this.personMapper.responseDeleteOne();

    res.sendStatus(status.OK).json(response);
  }
}
