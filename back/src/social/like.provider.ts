import { Connection, Repository } from 'typeorm';
import { Like } from './like.entity';
import { DbConnectionToken, LikeRepositoryToken } from '../constants';

export const likeProviders = [
  {
    provide: LikeRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Like),
    inject: [DbConnectionToken],
  },
];
