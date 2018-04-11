import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Like } from './likes.entity';
import { Comment } from './comments.entity'


@Entity()
export class Picture {
  @PrimaryGeneratedColumn({ type: 'int' }) id: number;

  @Column({ type: 'varchar', length: 100 }) url: string;

  @Column({ type: 'boolean' }) signaled: boolean;

  @ManyToMany(type => Like, Like => Like.picture) like: Like[];

  @ManyToOne(type => Comment, Comment => Comment.picture)
  comment: Comment[];

  //TODO
  //@ManyToOne(type => Activity, Activity => Activity.pictures)
  //Activity: Activity;
}