import { Connection, Repository } from 'typeorm';
import { Group } from './group.entity';
import { DbConnectionToken, GroupRepositoryToken } from '../constants';

export const groupProviders = [
  {
    provide: GroupRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Group),
    inject: [DbConnectionToken],
  },
];
