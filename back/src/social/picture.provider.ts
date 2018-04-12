import { Connection, Repository } from 'typeorm';
import { Picture } from './picture.entity';
import { DbConnectionToken, PictureRepositoryToken } from '../constants';

export const pictureProviders = [
  {
    provide: PictureRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Picture),
    inject: [DbConnectionToken],
  },
];
