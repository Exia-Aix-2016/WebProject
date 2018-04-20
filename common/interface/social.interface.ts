import { IUser } from ".";

export interface IComment extends ISignal {
    readonly id: number;
    readonly content: string;
    readonly signaled?: boolean;
    readonly pictureId: number;
    readonly userId: number;
}

export interface ICommentExtended extends IComment {
    user: IUser;
}

export interface ILike {
    userId: number;
    pictureId: number;
}

export interface IPicture extends ISignal {
    readonly id: number;
    readonly url: string;
    readonly likes: ILike[];
    readonly activityId: number;
}
export interface ISignal {
    readonly signaled?: boolean;
}

export interface IPictureExtended extends IPicture {
    // readonly userLikes: number[];
    readonly comments: ICommentExtended[];
}

