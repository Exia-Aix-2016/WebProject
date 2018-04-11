import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, PrimaryColumn } from 'typeorm';
import { Activity } from './activities.entity';

@Entity()
export class Participation{

 
    //TO-DO
    //@ManyToMany(type => User, User => User.Activity)
    //User: User[];

    @ManyToMany(type => Activity, Activity => Activity.participation)
    activity: Activity[];
}