import { Request, Response, NextFunction } from 'express';
import { NotFoundError } from '../errors';

export default (req: Request, res: Response, next: NextFunction): void =>
  next(new NotFoundError('Not found'));
