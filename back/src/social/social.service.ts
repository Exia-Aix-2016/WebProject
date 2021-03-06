import { Component, Inject, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import {
  CommentRepositoryToken,
  LikeRepositoryToken,
  PictureRepositoryToken,
} from '../constants';
import { Picture } from './picture.entity';
import { SocialSelectorDto, PictureDto, CommentDto } from '../../../common/dto';
import { isUndefined } from 'util';
import { IsDefined } from 'class-validator';
import { IPicture, IComment } from '../../../common/interface';

@Component()
export class SocialService {
  constructor(
    @Inject(CommentRepositoryToken)
    private readonly commentRepository: Repository<Comment>,
    @Inject(LikeRepositoryToken)
    private readonly likeRepository: Repository<Like>,
    @Inject(PictureRepositoryToken)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async likes(pictureOpt: number | Picture): Promise<number> {
    /*Count the number of likes on the picture...
    Get number of likes on a picture.*/
    const pictureId: number =
      typeof pictureOpt === 'number' ? pictureOpt : pictureOpt.id;

    const picture: Picture = await this.pictureRepository.findOneById(
      pictureId,
    );
    return await this.likeRepository.count({ picture });
  }

  async like(pictureId: number, userId: number, liked: boolean): Promise<void> {

    /*get picture*/
    const picture: Picture = await this.pictureRepository.findOneById(
      pictureId,
      { relations: ['likes'] },
    );

    /*Did user has already liked a picture ?*/

    const alreadyLiked: boolean = picture.likes.find(l => l.userId === userId)
      ? true
      : false;

    if (alreadyLiked && !liked) {
      /*Already liked*/
      const like: Like = await this.likeRepository.findOne({
        userId,
        pictureId,
      });
      await this.likeRepository.delete(like);
    } else if (!alreadyLiked && liked) {
      const like: Like = this.likeRepository.create({ picture, userId });
      await this.likeRepository.save(like);
    }
  }

  async signal(
    selector: SocialSelectorDto,
    signaled: boolean = true,
  ): Promise<void> {
    /*Signaled picture or comment*/
    if (isUndefined(selector.comment) && isUndefined(selector.picture)) {
      throw new Error('selector empty');
    }

    if (selector.comment) {
      await this.commentRepository.updateById(selector.comment.id, {
        signaled,
      });
    }
    if (selector.picture) {
      await this.pictureRepository.updateById(selector.picture.id, {
        signaled,
      });
    }
  }

  async delete(selector: SocialSelectorDto): Promise<void> {
    /*Delete comment or picture*/
    if (isUndefined(selector.comment) && isUndefined(selector.picture)) {
      throw new Error('selector empty');
    }

    if (selector.comment) {
      await this.commentRepository.deleteById(selector.comment.id);
    }
    if (selector.picture) {
      await this.pictureRepository.deleteById(selector.picture.id);
    }
  }

  async getComments(pictureOpt: number | Picture): Promise<IComment[]> {
    /*Get all comments on the picture*/
    const pictureId: number =
      typeof pictureOpt === 'number' ? pictureOpt : pictureOpt.id;

    const picture: Picture = await this.pictureRepository.findOneById(
      pictureId,
    );
    return await this.commentRepository.find({ picture });
  }

  async updateComment(commentId: number, commentDto: CommentDto) {
    await this.commentRepository.updateById(commentId, commentDto);
  }
  async addComment(pictureId:number, commentDto: CommentDto): Promise<void> {
    let picture: Picture = await this.pictureRepository.findOneById(pictureId);
    let comment: Comment = await this.commentRepository.create({
      picture,
      userId: commentDto.userId,
      content: commentDto.content,
    });
    this.commentRepository.save(comment);
  }

  async getPicture(pictureId: number): Promise<IPicture> {
    /*Get Picture by it ID*/

    return await this.pictureRepository.findOneById(pictureId);
  }

  async getPictures(activityId: number): Promise<IPicture[]> {
    /*Get Pictures by activityId*/

    const pictures: Picture[] = await this.pictureRepository.find();
    /*In pictures we will search all picture with activityId then we create new array with the matches Pictures.*/
    return await pictures.filter(picture => picture.activityId == activityId);
  }

  async addPicture(pictureDto: PictureDto) {
    let picture: Picture = this.pictureRepository.create(pictureDto);
    this.pictureRepository.save(picture);
  }
}
