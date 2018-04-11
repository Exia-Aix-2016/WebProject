import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToMany,
} from 'typeorm';
import { Picture } from './pictures.entity';

export class Comment {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 500 })
  content: string;

  @Column() signaled: boolean;

  @OneToMany(type => Picture, Picture => Picture.comment)
  picture: Picture;
  //TODO
  //OneToMany FOR USER
}
