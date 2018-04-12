import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Picture } from './picture.entity';

export class Comment {
    @PrimaryGeneratedColumn() id: number;

    @Column({ length: 500 }) content: string;

    @Column() signaled: boolean;

    @Column() idUser: number;

    @OneToMany(type => Picture, Picture => Picture.comment)
    picture: Picture;
  
 
}
