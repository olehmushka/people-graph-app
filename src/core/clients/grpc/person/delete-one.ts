import { ServiceError } from 'grpc';
import logger from 'pino';
import isNil from 'lodash/isNil';
import * as pb from '../../../../servers/grpc/proto/person/person_pb';
import { getPersonClient } from './common';

const main = ({ id }: { [key: string]: string }): void => {
  const log = logger();
  log.info({ id }, 'Calling server');
  const client = getPersonClient();

  const request = new pb.DeleteOneRequest();
  request.setId(id);

  client.deleteOne(request, (error: ServiceError | null): void => {
    if (!isNil(error)) {
      log.error(error, 'Person Client create one error');

      return;
    }
    log.info('Received response');
  });
};

const [id] = process.argv.slice(2);
main({ id });
