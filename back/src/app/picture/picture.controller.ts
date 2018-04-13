import { Body, Get, Post, Put, Delete, Controller, Inject, Param, UsePipes } from '@nestjs/common';
import { SocialService } from '../../social/social.service';
import { Picture } from '../../social/picture.entity';
import { SocialSelectorDto } from '../../../../common/dto/index';
import { IPicture, IComment } from '../../../../common/interface/index';
import { isUndefined } from 'util';
import { ValidationPipe } from '../validation.pipe';
import { PictureDto, SignalDto, LikeDto, CommentDto, EditCommentDto } from './picture.dto';
@Controller('pictures')
export class PictureController {
  constructor(private readonly socialService: SocialService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() pictureDto: PictureDto): Promise<void> {
    this.socialService.addPicture(pictureDto);
  }

  @Get(':activityId')
  async findPicturesByActivityId(@Param() params): Promise<IPicture[]> {
    return await this.socialService.getPictures(
      parseInt(params.activityId, 10),
    );
  }

  @Put(':pictureId/signal')
  @UsePipes(new ValidationPipe())
  async signalPicture(@Param() params, @Body() paramsBody: SignalDto) {
    let picture: IPicture = await this.socialService.getPicture(
      params.pictureId,
    );
    this.socialService.signal({ picture }, paramsBody.signaled);
  }

  @Delete(':pictureId')
  async deletePicture(@Param() params): Promise<void> {
    let picture: IPicture = await this.socialService.getPicture(
      params.pictureId,
    );
    await this.socialService.delete({ picture });
  }

  /*
  ======== LIKE  ========
  */
  @Put(':pictureId/like')
  @UsePipes(new ValidationPipe())
  async likedPicture(@Param() params, @Body() likeDto: LikeDto): Promise<void> {
    await this.socialService.like(
      params.pictureId,
      likeDto.userId,
      likeDto.liked,
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
  @UsePipes(new ValidationPipe())
  async postComment(
    @Param() params,
    @Body() commentDto: CommentDto,
  ): Promise<void> {
    await this.socialService.addComment(
      parseInt(params.pictureId, 10),
      commentDto,
    );
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
  @UsePipes(new ValidationPipe())
  async editCommentById(
    @Param() params,
    @Body() commentDto: EditCommentDto,
  ): Promise<void> {
    await this.socialService.updateComment(
      parseInt(params.commentId, 10),
      commentDto,
    );
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

  @Put(':pictureId/comments/:commentId/signal')
  @UsePipes(new ValidationPipe())
  async signalCommentById(@Param() params, @Body() signaled: SignalDto): Promise<void> {
    let comments: IComment[] = await this.socialService.getComments(
      parseInt(params.pictureId, 10),
    );

    let comment: IComment = await comments.reduce((acc, comment) => {
      if (comment.id == params.commentId) {
        acc = comment;
      }
      return acc;
    });

    this.socialService.signal({ comment }, signaled.signaled);
  }
}
