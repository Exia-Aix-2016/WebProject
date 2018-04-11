import { Connection, Repository } from 'typeorm';
import { Article } from './article.entity';
import { DbConnectionToken,  ArticleRepositoryToken} from "../constants";

export const ArticleProviders = [
  {
    provide: ArticleRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Article),
    inject: [DbConnectionToken],
  },
];