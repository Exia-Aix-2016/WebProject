import { IArticle } from '../../../common/interface';

export interface CartArticle {
    cartId: number;
    articleId: number;
    quantity: number;
    article?: IArticle;
}
