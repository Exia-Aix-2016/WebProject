import { ICartArticle } from ".";

export interface IArticle {
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly pictureUrl: string;
    readonly categoryName: string;
    readonly selling: boolean;
    readonly solded?: number;
    readonly cartArticles: ICartArticle[]
}