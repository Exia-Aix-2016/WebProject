import { Connection, Repository } from 'typeorm';
import { Cart } from './cart.entity';
import { DbConnectionToken, CartRepositoryToken } from '../constants';

export const CartProviders = [
  {
    provide: CartRepositoryToken,
    useFactory: (connection: Connection) => connection.getRepository(Cart),
    inject: [DbConnectionToken],
  },
];
