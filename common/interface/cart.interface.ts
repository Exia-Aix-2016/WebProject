export interface ICart{
    readonly id: number;
    readonly validated: boolean;
    readonly delivered: boolean;
    readonly userId: number;
}