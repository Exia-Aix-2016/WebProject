import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './activities.entity';

@Entity()
export class Occurence{

    @PrimaryColumn()
    name: string;

    @OneToMany(type => Activity, Activity => Activity.Occurency)
    Activity: Activity[];
}