import { INeo4jClient } from '../../modules/neo4j';
import { IPostgresClient } from '../../modules/postgres';
import { IPersonQueryBuilder, PersonNeo4jQueryBuilder, PersonPostgresQueryBuilder } from './query-builder';
import { PersonNeo4jParser, IPersonNeo4jParser } from './neo4j-parser';
import { IBasePerson, IPerson, IPersonHandlersGetAllParams } from '../../interfaces';
import { ILogger } from '../../lib/logger';

export interface IPersonHandlers {
  createOne(person: IBasePerson): Promise<IPerson>;
  getAll(params: IPersonHandlersGetAllParams): Promise<IPerson[]>;
  deleteOne(id: string): Promise<void>;
}

export class PersonHandlers implements IPersonHandlers {
  private static instance: PersonHandlers;
  constructor(
    private logger: ILogger,
    private neo4jClient: INeo4jClient,
    private postgresClient: IPostgresClient,
    private neo4jQueryBuilder: IPersonQueryBuilder,
    private postgresQueryBuilder: IPersonQueryBuilder,
    private neo4jParser: IPersonNeo4jParser,
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
      const persons = await self.neo4jClient.run(self.neo4jQueryBuilder.getAll(params)).then(self.neo4jParser.getAll);

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

  private errorHandle<T extends Error>(error: T): Promise<T> {
    const self = this === undefined ? PersonHandlers.instance : this;

    const { stack, message } = error;
    self.logger.error({ stack }, message);

    return Promise.reject(error);
  }
}

export interface IPersonHandlerConfig {
  logger: ILogger;
  neo4jClient: INeo4jClient;
  postgresClient: IPostgresClient;
}

export const getPersonHandler = ({ logger, neo4jClient, postgresClient }: IPersonHandlerConfig): PersonHandlers =>
  new PersonHandlers(
    logger,
    neo4jClient,
    postgresClient,
    new PersonNeo4jQueryBuilder(),
    new PersonPostgresQueryBuilder(),
    new PersonNeo4jParser(),
  );
