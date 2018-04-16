export interface CreateCartArticleDto{
    cartId: number;
    articleId: number;
    quantity?: number;
}

export interface setQuantityInCartDto{
    quantity: number;
}