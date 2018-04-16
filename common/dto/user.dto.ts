export interface CreateUserDto {
    name: string;
    firstname: string;
    email: string;
    password: string;
}

export interface EditUserDto {
    name?: string;
    firstname?: string;
    email?: string;
    password?: string;
    groupName?: string;
}

export interface GroupDto {
    name: string;
}

export interface LikeDto {
    userId: number;
    pictureId: number;
}