export interface IComment {
    readonly id: number;
    readonly content: string;
    readonly pictureId: number;
    readonly userId: number;   
}

export interface IPicture {

    readonly id: number;
    readonly url: string;
    readonly signaled: boolean;
    readonly likes: number;
    readonly activityId: number;
}

export interface IPictureExtended extends IPicture {
    readonly userLikes: Array<number>;
    readonly comments: IComment[];
}