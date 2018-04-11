export interface CreateUserDto {
    name: string;
    firstname: string;
    email: string;
    password: string;
}

export interface EditUserDto {
    id: number;
    name?: string;
    firstname?: string;
    email?: string;
    password?: string;
}
