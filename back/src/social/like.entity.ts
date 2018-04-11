import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, PrimaryColumn, OneToMany, RelationId } from 'typeorm';
import { Picture } from './picture.entity';

export class Like {
  
    @PrimaryColumn() userId: number;

    @ManyToOne(type => Picture, picture => picture.likes, {primary: true})
    picture: Picture;

    @RelationId((like: Like) => like.picture)
    pictureId: number;
}
