import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne } from 'typeorm';
import { Activity } from './activities.entity';

@Entity()
export class Occurence{

    @PrimaryColumn()
    name: string;

    @ManyToOne(type => Activity, Activity => Activity.Occurency)
    Activity: Activity;
}