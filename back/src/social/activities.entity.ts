import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Occurence } from './occurence.entity';
import { Picture } from './pictures.entity';

@Entity()
export class Activity {
  //PRIMARY KEY
  @PrimaryGeneratedColumn() id: Number;

  @Column({ type: 'varchar', length: 200 }) name: string;

  @Column({ type: 'text', length: 2048}) description: string;

  @Column({ type: 'varchar', length: 1048}) poster_url: string;

  @Column({ type: 'date' }) date: Date;

  @Column({ type: 'double' }) price: Number;

  @Column({ type: 'boolean' }) planned: boolean;

  @Column({ type: 'boolean' }) signaled: boolean;

  //FOREIGN KEY
  @ManyToMany(type => Occurence, Occurency => Occurency.Activity)
  Occurency: Occurence;

  @OneToMany(type => Picture, Picture => Picture.Activity)
  pictures: Picture[];
}