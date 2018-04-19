import { ICartArticle } from '../../../common/interface';

export interface Cart {
    readonly id: number;
    readonly validated: boolean;
    readonly delivered: boolean;
    readonly userId: number;
    readonly articles: ICartArticle[];
}
