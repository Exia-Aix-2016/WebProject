import { Connection, Repository } from 'typeorm';
import { Participation } from './participation.entity';
import { DbConnectionToken, ParticipationRepositoryToken } from '../constants';

export const participationProviders = [
  {
    provide: ParticipationRepositoryToken,
    useFactory: (connection: Connection) =>
      connection.getRepository(Participation),
    inject: [DbConnectionToken],
  },
];
