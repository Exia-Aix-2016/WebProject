import { Component, Inject, HttpException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { CommentRepositoryToken, LikeRepositoryToken, PictureRepositoryToken, } from '../constants';
import { Picture } from './picture.entity';
import { SocialSelectorDto } from '../../../common/dto'
import { isUndefined } from 'util';
import { IsDefined } from 'class-validator';


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

  async likes(pictureId: number | Picture): Promise<number> {//Count the number of likes on the picture...
    //Get number of likes on a picture.
    const id: number = typeof pictureId === 'number' ? pictureId : pictureId.id;

    const picture: Picture = await this.pictureRepository.findOneById(id);
    const likes: Like[] = await picture.likes;

    return likes.length;
  }

  async like(pictureOpt: number | Picture, userId: number, liked: boolean): Promise<void> {//Allow to like dislike a picture
    const pictureId: number = typeof pictureOpt === 'number' ? pictureOpt : pictureOpt.id;

    //get picture
    const picture: Picture = await this.pictureRepository.findOneById(
      pictureId,
      { relations: ['likes'] },
    );

    //Did user has already liked a picture ?

    let alreadyLiked: boolean = picture.likes.find(l => l.userId == userId)
      ? true
      : false;

    if (alreadyLiked && !liked) {
      //Already liked

      const like: Like = await this.likeRepository.findOne({
        userId,
        pictureId,
      });
      await this.likeRepository.delete(like);
    } else if (!alreadyLiked && liked) {
      const like: Like = this.likeRepository.create({ userId, pictureId });
      await this.likeRepository.save(like);
    }
  }

  async signal(selector: SocialSelectorDto, signaled: boolean): Promise<void> {//Signaled picture or comment
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

  async delete(selector: SocialSelectorDto): Promise<void> {//Delete comment or picture
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

  async getComments(pictureOpt: number | Picture): Promise<Comment[]>{//Get all comments on the picture
    const pictureId: number = typeof pictureOpt === 'number' ? pictureOpt : pictureOpt.id;

    return await this.commentRepository.find({pictureId});
  }
  async getPicture(pictureId: number): Promise<Picture>{//Get Picture by it ID

    return await this.pictureRepository.findOneById(pictureId);
  }

  
  async getPictures(activityId: number): Promise<Picture[]>{//Get Pictures by activityId

    const pictures: Picture[] = await this.pictureRepository.find();
    //In pictures we will search all picture with activityId then we create new array with the matches Pictures.
    const picturesActivity: Picture[] = await pictures.map( picture => {
      if(picture.activityId == activityId){
        return picture;
      }
    });
    return picturesActivity;
  }
}


