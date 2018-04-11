import { Component, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';
import { CommentRepositoryToken, LikeRepositoryToken } from '../constants';

@Component()
export class SocialService {
  constructor(
    @Inject(CommentRepositoryToken)
    private readonly commentRepository: Repository<Comment>,

    @Inject(LikeRepositoryToken)
    private readonly likeRepository: Repository<Like> 

  ) {}
  
}
