import { IPerson, IPersonHandlersGetAllParams } from '../../interfaces';
import config from '../../../../config';

export interface IPersonQueryBuilder {
  createOne(person: IPerson): string;
  getAll(params: IPersonHandlersGetAllParams): string;
  deleteOne(id: string): string;
}

export class PersonNeo4jQueryBuilder implements IPersonQueryBuilder {
  createOne(person: IPerson): string {
    return (
      'CREATE (p:Person {' +
      `id: "${person.id}", ` +
      `firstName: "${person.firstName}", ` +
      `lastName: "${person.lastName}", ` +
      `birthday: datetime("${person.birthday.format(
        config.formats.datetime,
      )}")` +
      '}) ' +
      'RETURN p'
    );
  }

  getAll(params: IPersonHandlersGetAllParams): string {
    return `MATCH (p:Person) RETURN p SKIP ${params.skip} LIMIT ${params.limit}`;
  }

  deleteOne(id: string): string {
    return `MATCH (p:Person {id: "${id}"}) ` + 'DELETE p';
  }
}

export class PersonPostgresQueryBuilder implements IPersonQueryBuilder {
  createOne(person: IPerson): string {
    const birthday = person.birthday.format(config.formats.datetime);

    return `
INSERT INTO persons (id, first_name, last_name, birthday)
VALUES ('${person.id}', '${person.firstName}', '${person.lastName}', '${birthday}');
    `;
  }

  getAll(params: IPersonHandlersGetAllParams): string {
    return `SELECT * FROM persons LIMIT ${params.limit} OFFSET ${params.skip};`;
  }

  deleteOne(id: string): string {
    return `
    DELETE FROM persons
    WHERE id = '${id}';
    `;
  }
}
