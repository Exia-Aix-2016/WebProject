import { CartArticle } from './cart-article';
import { IUser } from '../../../common/interface';

export interface Cart {
    id: number;
    validated: boolean;
    delivered: boolean;
    userId: number;
    cartArticles?: CartArticle[];
    user?: IUser;
    isCollapsed?: boolean;
}
