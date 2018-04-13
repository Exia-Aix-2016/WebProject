import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
  RelationId,
  ManyToOne,
} from 'typeorm';
import { Picture } from './picture.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn() id: number;

  @Column() userId: number;

  @Column({ length: 500 })
  content: string;

  @Column() signaled: boolean;

  @ManyToOne(type => Picture, Picture => Picture.comment)
  picture: Picture;

  @RelationId((comment: Comment) => comment.picture)
  pictureId: number;
}
