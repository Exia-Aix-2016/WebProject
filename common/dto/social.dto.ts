import { IPicture, IComment } from "../interface";

export interface SocialSelectorDto{
    picture?: IPicture;
    comment?: IComment;
}

export interface PictureDto{
    url: string;
    signaled?: boolean;
    activityId: number;

}

export interface CommentDto{
    userId: number;
    pictureId: number;
    content: string;
    signaled?: boolean;
}
