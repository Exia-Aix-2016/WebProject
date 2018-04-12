import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  PrimaryColumn,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Picture } from './picture.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn() id: number;

  @PrimaryColumn() userId: number;

  @Column({ length: 500 })
  content: string;

  @Column() signaled: boolean;

  @Column() idUser: number;

  @OneToMany(type => Picture, Picture => Picture.comment)
  picture: Picture;

  @RelationId((comment: Comment) => comment.picture)
  pictureId: number;
}
