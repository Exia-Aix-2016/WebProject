export interface CreateIdeaDto {
    name: string;
    description: string;
    posterUrl?: string;
}

export interface CreateActivityDto extends CreateIdeaDto {
    date: Date;
    price: number;
    occurrenceName: string;
}

export interface EditActivityDto {
    id: number;
    name?: string;
    description?: string;
    posterUrl?: string;
    date?: Date;
    price?: number;
    occurrenceName?: string;
}

export interface BooleanEditIdea {
    value: boolean;
}
