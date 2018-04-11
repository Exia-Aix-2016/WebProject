import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Like } from './likes.entity';
import { Comment } from './comments.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 100 }) url: string;

  @Column() signaled: boolean;

  @Column() idActivity: number;//FOREIGN KEY from activity

  @ManyToMany(type => Like, Like => Like.picture)
  like: Like[];

  @ManyToOne(type => Comment, Comment => Comment.picture)
  comment: Comment[];
}
