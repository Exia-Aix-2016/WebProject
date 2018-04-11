import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';

export class Comment{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: 'varchar', length: 500}) content: string;
}