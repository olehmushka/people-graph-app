import { QueryResult } from 'neo4j-driver';
import moment from 'moment';
import get from 'lodash/get';
import pick from 'lodash/pick';
import { IPerson } from '../../interfaces';

export interface IPersonNeo4jParser {
  getAll(result: QueryResult): IPerson[];
}

export class PersonNeo4jParser implements IPersonNeo4jParser {
  public getAll(result: QueryResult): IPerson[] {
    return result.records.map((r) =>
      this.parsePersonNode(r.get('p')?.properties),
    );
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
}
