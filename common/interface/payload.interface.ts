export interface IRawPayload {
    email: string;
    exp: number;
    firstname: string;
    groupName: string;
    iat: number;
    id: number;
    name: string;
}

export interface IPayload {
    email: string;
    exp: Date;
    firstname: string;
    groupName: string;
    iat: Date;
    id: number;
    name: string;
}
