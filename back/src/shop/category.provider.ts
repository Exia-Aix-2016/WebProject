import { Connection, Repository } from 'typeorm';
import { Category } from './category.entity';
import { DbConnectionToken,  CategoryRepositoryToken} from "../constants";

export const CategoryProviders = [
  {
    provide: CategoryRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Category),
    inject: [DbConnectionToken],
  },
];