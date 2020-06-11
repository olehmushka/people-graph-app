import { ServiceError } from 'grpc';
import logger from 'pino';
import isNil from 'lodash/isNil';
import * as pb from '../../../../servers/grpc/proto/person/person_pb';
import { getPersonClient } from './common';

const main = ({ limit, skip }: { [key: string]: string }): void => {
  const log = logger();
  log.info({ limit, skip }, 'Calling server');
  const client = getPersonClient();

  const request = new pb.GetAllRequest();
  request.setLimit(Number(limit));
  request.setSkip(Number(skip));

  client.getAll(request, (error: ServiceError | null, response: pb.GetAllResponse): void => {
    if (!isNil(error)) {
      log.error(error, 'Person Client create one error');

      return;
    }

    const responseDate = response.getDataList();
    const data = responseDate.map((person) => ({
      id: person?.getId(),
      firstName: person?.getFirstname(),
      lastName: person?.getLastname(),
      birthday: person?.getBirthday(),
    }));
    const responseTimestamp = response.getTimestamp();

    log.info(
      {
        data,
        timestamp: responseTimestamp,
      },
      'Received response',
    );
  });
};

const [limit, skip] = process.argv.slice(2);
main({ limit, skip });
