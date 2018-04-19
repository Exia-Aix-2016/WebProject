export interface IUser {
    readonly id: number;
    readonly name: string;
    readonly firstname: string;
    readonly email: string;
    readonly password: string;
    readonly groupName: string;
}

export interface IGroup {
    readonly name: string;
}
