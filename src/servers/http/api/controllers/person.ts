import {
  interfaces,
  controller,
  httpPost,
  httpGet,
  httpDelete,
  request,
  response,
} from 'inversify-express-utils';
import { inject } from 'inversify';
import { Request, Response } from 'express';
import status from 'http-status';
import { TYPES } from '../../ioc/types';
import { IPersonHandlers } from '../../../../core/handlers';
import {
  personCreateSchema,
  personGetAllSchema,
  personDeleteSchema,
} from '../schemas';

@controller('/person')
export class PersonController implements interfaces.Controller {
  constructor(
    @inject(TYPES.personHandlers) private personHandler: IPersonHandlers,
  ) {}

  @httpPost('/')
  public async createOne(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    const person = await personCreateSchema.validateAsync(req.body);
    const data = await this.personHandler.createOne(person.data);

    res.status(status.CREATED).json({
      data,
      timestamp: new Date(),
    });
  }

  @httpGet('/')
  public async getAll(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    const { skip, limit } = await personGetAllSchema.validateAsync(req.query);
    const data = await this.personHandler.getAll({ skip, limit });

    res.status(status.OK).json({
      data,
      timestamp: new Date(),
    });
  }

  @httpDelete('/:id')
  public async deleteOne(
    @request() req: Request,
    @response() res: Response,
  ): Promise<void> {
    const { id } = await personDeleteSchema.validateAsync(req.params);
    await this.personHandler.deleteOne(id);

    res.sendStatus(status.NO_CONTENT);
  }
}
