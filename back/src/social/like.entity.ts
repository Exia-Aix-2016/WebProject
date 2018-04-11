import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Picture } from './picture.entity';

export class Like {
  
    @PrimaryColumn() idUser: number;

    @ManyToOne(type => Picture, picture => picture.likes)
    picture: Picture[];
}
