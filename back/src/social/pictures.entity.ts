import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, ManyToMany } from 'typeorm';
import { Like } from './likes.entity';


@Entity()
export class Picture{

    @PrimaryGeneratedColumn({ type: 'int'}) id: Number;

    @Column({ type: 'varchar', length: 100}) url: string;

    @Column({ type: 'boolean', default: null}) signaled: boolean;

    @ManyToMany(type => Like, Like => Like.picture)
    like: Like[];

    //@ManyToOne(type => Activity, Activity => Activity.pictures)
   //Activity: Activity;
}