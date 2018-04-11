import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Picture } from './pictures.entity';


export class Like{

    //@ManyToMany for USER
    @ManyToMany(type => Picture, Picture => Picture.like)
    picture: Picture[];


}