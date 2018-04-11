import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, RelationId } from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 100 })
  url: string;

  @Column() signaled: boolean;

  @Column() idActivity: number;

  @ManyToMany(type => Like, like => like.picture)
  likes: Like[];

  @ManyToOne(type => Comment, Comment => Comment.picture)
  comment: Comment[];
}
