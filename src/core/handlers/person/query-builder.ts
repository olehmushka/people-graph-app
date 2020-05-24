import moment from 'moment';
import { IPerson, IPersonHandlersGetAllParams } from '../../interfaces';

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
      `birthday: datetime("${moment(person.birthday).format()}")` +
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
    const birthday = moment(person.birthday).format();

    return `
INSERT INTO persons (id, first_name, last_name, birthday)
VALUES ('${person.id}', '${person.firstName}', '${person.lastName}', '${birthday}');
    `;
  }

  getAll(params: IPersonHandlersGetAllParams): string {
    return '';
  }

  deleteOne(id: string): string {
    return `
    DELETE FROM persons
    WHERE id = '${id}';
    `;
  }
}
