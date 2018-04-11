import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Activity } from './activities.entity';

@Entity()
export class Picture{

    @PrimaryGeneratedColumn({ type: 'int'}) id: Number;

    @Column({ type: 'varchar', length: 100}) url: string;

    @Column({ type: 'boolean', default: null}) signaled: boolean;

    @ManyToOne(type => Activity, Activity => Activity.pictures)
    Activity: Activity;
}