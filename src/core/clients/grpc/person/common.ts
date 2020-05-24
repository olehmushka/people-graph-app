import { credentials } from 'grpc';
import * as gpb from '../../../../servers/grpc/proto/person/person_grpc_pb';
import config from '../../../../../config';

export const getPersonClient = () =>
  new gpb.PersonClient(
    `0.0.0.0:${config.servers.grpc.port}`,
    credentials.createInsecure(),
  );
