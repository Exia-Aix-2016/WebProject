export interface IArticle{
    readonly id: number;
    readonly name: string;
    readonly description: string;
    readonly price: number;
    readonly pictureUrl: string;
    readonly categoryName: string;
    readonly solded: number;
}