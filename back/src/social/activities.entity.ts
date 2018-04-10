import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Occurence } from './occurence.entity';
import { Picture } from './pictures.entity';

@Entity()
export class Activity {

  //PRIMARY KEY
  @PrimaryGeneratedColumn() id: Number;

  @Column() name: string;

  @Column() description: string;

  @Column() poster_url: string;

  @Column() date: Date;

  @Column() price: Number;

  @Column() planned: boolean;

  @Column() signaled: boolean;

  //FOREIGN KEY
  @OneToMany(type => Occurence, Occurency => Occurency.Activity)
  Occurency: Occurence[];

  @OneToMany(type => Picture, Picture => Picture.Activity)
  pictures: Picture[];
}