import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Picture } from './pictures.entity';

export class Comment{
    @PrimaryGeneratedColumn({ type: 'int' }) id: number;

    @Column({type: 'varchar', length: 500}) content: string;

    @Column({type: 'boolean' }) signaled: boolean;


    @OneToMany(type => Picture, Picture => Picture.comment)
    picture: Picture;
    //TODO
    //OneToMany FOR USER
}