import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { CommentRepositoryToken, LikeRepositoryToken, PictureRepositoryToken, } from '../constants';
import { Picture } from './picture.entity';
import { IUser } from '../../../common/interface';


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

  
  async likes(pictureId: number | Picture): Promise<number> {//Get number of likes on a picture.
    const id: number = typeof pictureId === 'number' ? pictureId : pictureId.id;

    const picture: Picture = await this.pictureRepository.findOneById(id);
    const likes: Like[] = await picture.likes;

    return likes.length;
  }

  async like(pictureOpt: number | Picture, userOpt: number | IUser, liked: boolean): Promise<void>{
    const pictureId: number = typeof pictureOpt === 'number' ? pictureOpt : pictureOpt.id;
    const userId: number = typeof userOpt === 'number' ? userOpt : userOpt.id;

    //get picture
    const picture: Picture = await this.pictureRepository.findOneById(pictureId, {relations: ['likes']});


    //Did user has already liked a picture ?

    let alreadyLiked: boolean = picture.likes.find(l => l.userId == userId) ? true : false;
 
    if(alreadyLiked && !liked){//Already liked

     const like: Like = await this.likeRepository.findOne({ userId, pictureId });
     await this.likeRepository.delete(like);

    } else if(!alreadyLiked && liked){

      await this.likeRepository.create({userId, pictureId});

    }
    




  }


}


