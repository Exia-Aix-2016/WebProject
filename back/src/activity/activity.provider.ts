import { Connection, Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { Occurrence } from './occurrence.entity';
import { Participation } from './participation.entity';
import {
  DbConnectionToken,
  ActivityRepositoryToken,
  OccurrenceRepositoryToken,
  ParticipationRepositoryToken,
  VoteRepositoryToken,
} from '../constants';
import { Vote } from './vote.entity';

export const activityProviders = [
  {
    provide: ActivityRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Activity),
    inject: [DbConnectionToken],
  },
  {
    provide: OccurrenceRepositoryToken,
    useFactory: (connection: Connection) =>
      connection.getRepository(Occurrence),
    inject: [DbConnectionToken],
  },
  {
    provide: ParticipationRepositoryToken,
    useFactory: (connection: Connection) =>
      connection.getRepository(Participation),
    inject: [DbConnectionToken],
  },
  {
    provide: VoteRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Vote),
    inject: [DbConnectionToken],
  },
];
