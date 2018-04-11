import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Picture } from './pictures.entity';

export class Like {
  
  @Column() idUser: number;

  @ManyToOne(type => Picture, Picture => Picture.like)
  picture: Picture[];
}
