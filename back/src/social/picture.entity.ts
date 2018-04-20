import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Like } from './like.entity';
import { Comment } from './comment.entity';

@Entity()
export class Picture {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 100 })
  url: string;

  @Column() signaled: boolean;

  @Column() activityId: number;

  @OneToMany(type => Like, like => like.picture)
  likes: Like[];

  @OneToMany(type => Comment, comment => comment.picture)
  comment: Comment[];
}
