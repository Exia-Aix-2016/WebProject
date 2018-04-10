import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Activity } from './activities.entity';

@Entity()
export class Picture{

    @PrimaryGeneratedColumn({ type: 'int'}) id: Number;

    @Column({ type: 'varchar', length: 1024}) url: string;

    @ManyToOne(type => Activity, Activity => Activity.pictures)
    Activity: Activity;
}