export interface setQuantityInCartDto{
    quantity: number;
}

export interface CartStateDto{
    validated?: boolean;
    delivered?: boolean;
}

export interface CreateCartDto{
    userId: number;
}