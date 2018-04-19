export interface SetQuantityInCartDto {
    quantity: number;
}

export interface CartStateDto {
    validated?: boolean;
    delivered?: boolean;
}

export interface CreateCartDto {
    userId: number;
}