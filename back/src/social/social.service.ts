import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { CommentRepositoryToken, LikeRepositoryToken, PictureRepositoryToken, } from '../constants';
import { Picture } from './picture.entity';


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

  async like(pictureId: number | Picture, userId: number | Iuser)


}


