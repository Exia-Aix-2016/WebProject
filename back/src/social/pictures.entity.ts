import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Activity } from './activities.entity';

@Entity()
export class Picture{

    @PrimaryGeneratedColumn()
    id: Number;

    @Column()
    url: string;

    @ManyToOne(type => Activity, Activity => Activity.pictures)
    Activity: Activity;
}