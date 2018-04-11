import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany } from 'typeorm';
import { Occurence } from './occurence.entity';
import { Picture } from './pictures.entity';
import { Participation } from './participations.entity';

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
  @OneToMany(type => Occurence, Occurency => Occurency.Activity)
  Occurency: Occurence;

  @OneToMany(type => Picture, Picture => Picture.Activity)
  pictures: Picture[];

  @ManyToMany(type => Participation, Participation => Participation.Activity)
  Participation: Participation[];
}