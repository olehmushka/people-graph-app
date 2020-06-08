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

  private parsePersonNode(p: { [key: string]: string | number }): IPerson {
    const birthday = moment().set({
      year: get(p, 'birthday.year.low') as number,
      month: get(p, 'birthday.month.low') as number,
      date: get(p, 'birthday.day.low') as number,

      hour: get(p, 'birthday.hour.low') as number,
      minute: get(p, 'birthday.minute.low') as number,
      second: get(p, 'birthday.second.low') as number,
    });

    return {
      birthday,
      ...pick(p as { [key: string]: string }, ['id', 'firstName', 'lastName']),
    };
  }
}
