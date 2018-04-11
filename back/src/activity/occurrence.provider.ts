import { Connection, Repository } from 'typeorm';
import { Occurrence } from './occurrence.entity';
import { DbConnectionToken, OccurrenceRepositoryToken } from '../constants';

export const occurrenceProviders = [
  {
    provide: OccurrenceRepositoryToken,
    useFactory: (connection: Connection) =>
      connection.getRepository(Occurrence),
    inject: [DbConnectionToken],
  },
];
