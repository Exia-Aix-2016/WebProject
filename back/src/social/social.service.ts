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

  likes(picture: number | Picture): number{
    
  }
  
}


