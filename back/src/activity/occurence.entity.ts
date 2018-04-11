import { Entity, Column, PrimaryGeneratedColumn, PrimaryColumn, ManyToOne, OneToMany } from 'typeorm';
import { Activity } from './activities.entity';

@Entity()
export class Occurence{

    @PrimaryColumn({type: 'varchar' }) name: string;

    @ManyToOne(type => Activity, Activity => Activity.occurence) 
    activity: Activity[];
}