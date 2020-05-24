import { ServiceError } from 'grpc';
import logger from 'pino';
import isNil from 'lodash/isNil';
import * as pb from '../../../../servers/grpc/proto/person/person_pb';
import { getPersonClient } from './common';

const main = ({
  firstName,
  lastName,
  birthday,
}: {
  [key: string]: string;
}): void => {
  const log = logger();
  log.info({ firstName, lastName, birthday }, 'Calling server');
  const client = getPersonClient();

  const request = new pb.CreateOneRequest();
  const requestData = new pb.CreateOneRequest.CreateOneRequestData();
  requestData.setFirstname(firstName);
  requestData.setLastname(lastName);
  requestData.setBirthday(birthday);
  request.setData(requestData);

  client.createOne(
    request,
    (error: ServiceError | null, response: pb.CreateOneResponse): void => {
      if (!isNil(error)) {
        log.error(error, 'Person Client create one error');

        return;
      }

      const responseDate = response.getData();
      const data = {
        id: responseDate?.getId(),
        firstName: responseDate?.getFirstname(),
        lastName: responseDate?.getLastname(),
        birthday: responseDate?.getBirthday(),
      };
      const responseTimestamp = response.getTimestamp();

      log.info(
        {
          data,
          timestamp: responseTimestamp,
        },
        'Received response',
      );
    },
  );
};

const [firstName, lastName, birthday] = process.argv.slice(2);
main({ firstName, lastName, birthday });
