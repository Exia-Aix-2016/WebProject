export interface CreateArticleDto{
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    categoryName: string;
    selling: boolean;
}