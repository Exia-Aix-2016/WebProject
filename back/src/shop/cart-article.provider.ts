import { Connection, Repository } from 'typeorm';
import { CartArticle } from './cart-article.entity';
import { DbConnectionToken,  CartArticleRepositoryToken} from "../constants";

export const CartArticleProviders = [
  {
    provide: CartArticleRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(CartArticle),
    inject: [DbConnectionToken],
  },
];