import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  RelationId,
} from 'typeorm';
import { Picture } from './picture.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 500 })
  content: string;

  @Column() signaled: boolean;

  @Column() idUser: number;

  @OneToMany(type => Picture, Picture => Picture.comment)
  picture: Picture;

  @RelationId((comment: Comment) => comment.picture)
  pictureId: number;
}
