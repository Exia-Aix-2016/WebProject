import { Body, Get, Post, Put, Delete, Controller, Inject, Param } from '@nestjs/common';
import { SocialService } from '../../social/social.service';
import { Picture } from '../../social/picture.entity';
import { SocialSelectorDto } from '../../../../common/dto/index';
import { IPicture, IComment } from '../../../../common/interface/index';
import { isUndefined } from 'util';

@Controller('pictures')
export class PictureController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  root(@Body() bodyParams): object {
    if (isUndefined(bodyParams.activityId) || isUndefined(bodyParams.url)) {
      return { statut: 'error', msg: 'wrong body params' };
    }

    this.socialService.addPicture({
      url: bodyParams.url,
      activityId: bodyParams.activityId,
    });
  }

  @Get(':activityId')
  async findPicturesByActivityId(@Param() params): Promise<IPicture[]> {
    return await this.socialService.getPictures(params.activityId);
  }

  @Delete(':pictureId')
  async deletePictureById(@Param() params): Promise<void> {
    let picture: IPicture = await this.socialService.getPicture(
      params.pictureId,
    );
    await this.socialService.delete({ picture });
  }

  /*
  ======== LIKE  ========
  */
  @Put(':pictureId/like')
  async likedPicture(@Param() params, @Body() bodyParams) {
    if (isUndefined(bodyParams.userId) || isUndefined(bodyParams.liked)) {
      return { statut: 'error', msg: 'wrong body params' };
    }

    await this.socialService.like(
      parseInt(params.pictureId, 10),
      parseInt(bodyParams.userId, 10),
      bodyParams.liked == 'true',
    );
  }

  @Get(':pictureId/likes')
  async getLikesPictureById(@Param() params): Promise<number> {
    return await this.socialService.likes(parseInt(params.pictureId, 10));
  }

  /*
  ======== COMMENTS  ========
  */

  @Get(':pictureId/comments')
  async getComments(@Param() params): Promise<IComment[]> {
    return await this.socialService.getComments(parseInt(params.pictureId, 10));
  }

  @Post(':pictureId/comments')
  async postComment(@Param() params, @Body() paramsBody): Promise<void> {
    await this.socialService.addComment({
      pictureId: params.pictureId,
      userId: paramsBody.userId,
      content: paramsBody.content,
    });
  }

  //get comment by its id
  @Get(':pictureId/comments/:commentId')
  async getCommentById(@Param() params): Promise<IComment> {
    let comments: IComment[] = await this.socialService.getComments(
      parseInt(params.pictureId, 10),
    );
    return await comments.reduce((acc, comment) => {
      if (comment.id == params.commentId) {
        acc = comment;
      }
      return acc;
    });
  }

  //update comment by its id
  @Put(':pictureId/comments/:commentId')
  async editCommentById(@Param() params, @Body() paramsBody): Promise<object> {
    if(isUndefined(paramsBody.userId) || isUndefined(paramsBody.content)){
      return { statut: 'error', msg: 'wrong body params' };
    }

    await this.socialService.updateComment(parseInt(params.commentId,10), 
      {
        content: paramsBody.content, 
        userId: parseInt(paramsBody.userId, 10), 
        pictureId: parseInt(params.pictureId),
      });


  }

  //delete comment by its id
  @Delete(':pictureId/comments/:commentId')
  async deleteCommentById(@Param() params): Promise<void> {
    let comments: IComment[] = await this.socialService.getComments(
      parseInt(params.pictureId, 10),
    );
    let comment: IComment = await comments.reduce((acc, comment) => {
      if (comment.id == params.commentId) {
        acc = comment;
      }
      return acc;
    });
    await this.socialService.delete({ comment });
  }
}
