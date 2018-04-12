import { Connection, Repository } from 'typeorm';
import { Picture } from './picture.entity';
import { DbConnectionToken, PictureRepositoryToken, CommentRepositoryToken, LikeRepositoryToken } from '../constants';
import { Like } from './like.entity';

export const pictureProviders = [
  {
    provide: PictureRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Picture),
    inject: [DbConnectionToken],
  },
];

export const commentProviders = [
  {
    provide: CommentRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Comment),
    inject: [DbConnectionToken],
  },
];

export const likeProviders = [
  {
    provide: LikeRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Like),
    inject: [DbConnectionToken],
  },
] ;
