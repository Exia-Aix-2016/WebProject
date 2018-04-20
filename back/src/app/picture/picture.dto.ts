import {
  IsString,
  IsEmail,
  Equals,
  IsNotEmpty,
  Matches,
  Length,
  IsOptional,
  IsNumber,
  IsEnum,
  IsIn,
  IsBoolean,
} from 'class-validator';

import {
  PictureDto as IPictureDto,
} from '../../../../common/dto';
import {LikeDto as ILike } from '../../../../common/dto';
import {CommentDto as ICommentDto} from '../../../../common/dto';

export class PictureDto implements IPictureDto{

    @IsString()
    @IsNotEmpty()
    url: string;

    @IsBoolean()
    @IsOptional()
    signaled?: boolean;
    @IsNumber()
    activityId: number;   
}

export class CommentDto implements ICommentDto{


    @IsNumber()
    pictureId: number;

    @IsNumber()
    userId: number; 

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    @IsOptional()
    signaled?: boolean;

 
}
export class EditCommentDto implements ICommentDto{

    @IsNumber()
    @IsOptional()
    pictureId: number;

    @IsNumber()
    @IsOptional()
    userId: number; 

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsBoolean()
    @IsOptional()
    signaled?: boolean;
}

export class LikeDto implements ILike{
    @IsNumber()
    userId: number;
    @IsNumber()
    pictureId: number;
    @IsBoolean()
    liked: boolean;
}

export class SignalDto {

    @IsBoolean()
    signaled: boolean;
}