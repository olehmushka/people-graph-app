import { BadRequestError } from '../http/api/errors';

export interface IValidate {
  validate<T>(
    input: unknown,
  ): {
    error?: unknown;
    errors?: unknown;
    value?: T;
  };

  validateAsync<T>(input: unknown): Promise<T>;
}

export class Schema {
  constructor(private schema: IValidate) {}

  public async validate<T>(input: unknown): Promise<T> {
    try {
      const result = await this.schema.validateAsync<T>(input);

      return result;
    } catch (error) {
      throw new BadRequestError(error);
    }
  }
}
