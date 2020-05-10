import { Container } from 'inversify';
import logger, { BaseLogger } from 'pino';
import { TYPES } from './types';
import config from '../../../config';

const container = new Container();

container.bind<BaseLogger>(TYPES.logger).toConstantValue(logger({ level: config.logger.level }) as BaseLogger);

export { container };
