import { createConnection } from 'typeorm';
import { DbConnectionToken } from '../constants';
import { CustomNamingStrategy } from './naming-strategy';

export const databaseProviders = [
  {
    provide: DbConnectionToken,
    useFactory: async () =>
      await createConnection({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: 'root',
        database: 'webproject',
        entities: ['../**/*.entity{.ts,.js}'],
        namingStrategy: new CustomNamingStrategy(),
      }),
  },
];
