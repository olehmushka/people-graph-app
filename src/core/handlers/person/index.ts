import { BaseLogger } from 'pino';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { INeo4jClient } from '../../modules/neo4j';
import { IPostgresClient } from '../../modules/postgres';
import {
  IPersonQueryBuilder,
  PersonNeo4jQueryBuilder,
  PersonPostgresQueryBuilder,
} from './query-builder';
import {
  IBasePerson,
  IPerson,
  IPersonHandlersGetAllParams,
} from '../../interfaces';

export interface IPersonHandlers {
  createOne(person: IBasePerson): Promise<IPerson>;
  getAll(params: IPersonHandlersGetAllParams): Promise<IPerson[]>;
  deleteOne(id: string): Promise<void>;
}

export class PersonHandlers implements IPersonHandlers {
  private static instance: PersonHandlers;
  constructor(
    private logger: BaseLogger,
    private neo4jClient: INeo4jClient,
    private postgresClient: IPostgresClient,
    private neo4jQueryBuilder: IPersonQueryBuilder,
    private postgresQueryBuilder: IPersonQueryBuilder,
  ) {
    PersonHandlers.instance = this;
  }

  public async createOne(basePerson: IBasePerson): Promise<IPerson> {
    const self = this === undefined ? PersonHandlers.instance : this;

    try {
      const person: IPerson = {
        id: require('uuid').v4(),
        ...basePerson,
      };
      await Promise.all([
        self.neo4jClient.run(self.neo4jQueryBuilder.createOne(person)),
        self.postgresClient.query(self.postgresQueryBuilder.createOne(person)),
      ]);

      return person;
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  public async getAll(params: IPersonHandlersGetAllParams): Promise<IPerson[]> {
    const self = this === undefined ? PersonHandlers.instance : this;

    try {
      const records = await self.neo4jClient.run(
        self.neo4jQueryBuilder.getAll(params),
      );
      const persons = records.map((r) =>
        self.parsePersonNode(r.get('p')?.properties),
      );

      return persons;
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  public async deleteOne(id: string): Promise<void> {
    const self = this === undefined ? PersonHandlers.instance : this;

    try {
      await Promise.all([
        self.neo4jClient.run(self.neo4jQueryBuilder.deleteOne(id)),
        self.postgresClient.query(self.postgresQueryBuilder.deleteOne(id)),
      ]);
    } catch (error) {
      return self.errorHandle(error);
    }
  }

  private parsePersonNode(p: {
    [key: string]: string | number | any;
  }): IPerson {
    const birthday = moment().set({
      year: get(p, 'birthday.year.low'),
      month: get(p, 'birthday.month.low'),
      date: get(p, 'birthday.day.low'),

      hour: get(p, 'birthday.hour.low'),
      minute: get(p, 'birthday.minute.low'),
      second: get(p, 'birthday.second.low'),
    });

    return {
      birthday,
      ...pick(p, ['id', 'firstName', 'lastName']),
    };
  }

  private errorHandle(error: any): Promise<any> {
    const self = this === undefined ? PersonHandlers.instance : this;

    const { stack, message } = error;
    self.logger.error({ stack }, message);

    return Promise.reject(error);
  }
}

export interface IPersonHandlerConfig {
  logger: BaseLogger;
  neo4jClient: INeo4jClient;
  postgresClient: IPostgresClient;
}

export const getPersonHandler = ({
  logger,
  neo4jClient,
  postgresClient,
}: IPersonHandlerConfig): PersonHandlers =>
  new PersonHandlers(
    logger,
    neo4jClient,
    postgresClient,
    new PersonNeo4jQueryBuilder(),
    new PersonPostgresQueryBuilder(),
  );
