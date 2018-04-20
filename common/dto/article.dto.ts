export interface CreateArticleDto{
    name: string;
    description: string;
    price: number;
    pictureUrl: string;
    categoryName: string;
    selling: boolean;
}

export interface EditArticleDto{
    name?: string;
    description?: string;
    price?: number;
    pictureUrl?: string;
    categoryName?: string;
    selling?: boolean;
    solded?: number;
}