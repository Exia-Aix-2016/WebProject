import { Connection, Repository } from 'typeorm';
import { Activity } from './activity.entity';
import { DbConnectionToken, ActivityRepositoryToken } from '../constants';

export const activityProviders = [
  {
    provide: ActivityRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Activity),
    inject: [DbConnectionToken],
  },
];
