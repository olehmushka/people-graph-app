import { BaseLogger } from 'pino';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { INeo4jClient } from '../modules/neo4j';
import { IPostgresClient } from '../modules/postgres';
import { IBasePerson, IPerson } from '../interfaces';

export interface IPersonHandlers {
  createOne(person: IBasePerson): Promise<IPerson>;
  getAll(params: IPersonHandlersGetAllParams): Promise<IPerson[]>;
  deleteOne(id: string): Promise<void>;
}

export interface IPersonHandlersGetAllParams {
  skip: number;
  limit: number;
}

export class PersonHandlers implements IPersonHandlers {
  constructor(
    private logger: BaseLogger,
    private neo4jClient: INeo4jClient,
    private postgresClient: IPostgresClient,
  ) {}

  public async createOne(basePerson: IBasePerson): Promise<IPerson> {
    try {
      const person: IPerson = {
        id: require('uuid').v4(),
        ...basePerson,
      };
      await this.neo4jClient.run(
        'CREATE (p:Person {' +
          `id: "${person.id}", ` +
          `firstName: "${person.firstName}", ` +
          `lastName: "${person.lastName}", ` +
          `birthday: datetime("${moment(person.birthday).format()}")` +
          '}) ' +
          'RETURN p',
      );

      return person;
    } catch (error) {
      return this.errorHandle(error);
    }
  }

  public async getAll(params: IPersonHandlersGetAllParams): Promise<IPerson[]> {
    return this.neo4jClient
      .run(
        `MATCH (p:Person) RETURN p SKIP ${params.skip} LIMIT ${params.limit}`,
      )
      .then((records) =>
        records.map((r) => this.parsePersonNode(r.get('p.properties'))),
      )
      .catch(this.errorHandle);
  }

  public async deleteOne(id: string): Promise<void> {
    try {
      await this.neo4jClient.run(
        `MATCH (p:Person {id: "${id}"}) ` + 'DELETE p',
      );
    } catch (error) {
      return this.errorHandle(error);
    }
  }

  private parsePersonNode(p: {
    [key: string]: string | number | any;
  }): IPerson {
    const birthday = moment()
      .set({
        year: get(p, 'birthday.year.low'),
        month: get(p, 'birthday.month.low'),
        date: get(p, 'birthday.day.low'),

        hour: get(p, 'birthday.hour.low'),
        minute: get(p, 'birthday.minute.low'),
        second: get(p, 'birthday.second.low'),
      })
      .toDate();

    return {
      birthday,
      ...pick(p, ['id', 'firstName', 'lastName']),
    };
  }

  private errorHandle(error: any): Promise<any> {
    const { stack, message } = error;
    this.logger.error({ stack }, message);

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
  new PersonHandlers(logger, neo4jClient, postgresClient);
